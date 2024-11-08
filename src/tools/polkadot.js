import { ApiPromise, WsProvider } from "@polkadot/api";

export async function getApi(endpoint) {
  const provider = new WsProvider(endpoint);
  const api = await ApiPromise.create({ provider });
  return api;
}
export async function on(api, filter = {}, cb) {
  return await api.query.system.events((events) => {
    const results = [];
    const createdAtHash = events?.createdAtHash;

    events.forEach((record) => {
      const { event, phase } = record;
      if (phase.isNone) {
        return;
      }
      const index = Number(phase.value.toString());
      if (
        event.section !== "system" &&
        (!filter.section ||
          event.section === filter.section ||
          filter.section.includes(event.section)) &&
        (!filter.method ||
          event.method === filter.method ||
          filter.method.includes(event.method))
      ) {
        results.push({
          createdAtHash,
          phase: index,
          section: event.section,
          method: event.method,
          success: undefined,
          data: event.data,
        });
      }
      if (event.section === "system") {
        results.forEach((item, indexResult) => {
          if (item.phase === index) {
            if (event.method === "ExtrinsicSuccess") {
              results[indexResult].success = true;
            } else if (event.method === "ExtrinsicFailed") {
              results[indexResult].success = false;
            }
          }
        });
      }
    });
    if (results.length) {
      cb(results);
    }
  });
}

export async function start() {
  const api = await getApi();
}
