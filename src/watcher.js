import Queue from "better-queue";
import SqliteStore from "better-queue-sqlite";
import { Markup } from "telegraf";
import bot from "./bot";
import Location, { STATUS } from "./models/location";
import Profile from "./models/profile";
import { PATH_QUEUE_DB } from "./paths";
import { getApi, on } from "./tools/polkadot";
import { escape } from "./tools/utils";
import { t } from "./translate";

export const watcher = async () => {
  const store = new SqliteStore({ path: PATH_QUEUE_DB });
  const api = await getApi(process.env.ENDPOINT_PARACHAIN);

  const queue = new Queue(
    async function (r, cb) {
      for (const item of r) {
        if (
          item.cid.split("next_location").length >= 2 ||
          item.cid.split("chapter3_skull_opened").length >= 2
        ) {
          let location;
          if (item.controller === process.env.CONTROLLER_1) {
            location = 1;
          } else if (item.controller === process.env.CONTROLLER_2) {
            location = 2;
          } else if (item.controller === process.env.CONTROLLER_3) {
            location = 3;
          }
          if (location) {
            const profile = await Profile.findOne({
              where: { location: location },
            });
            if (profile) {
              const header = await api.rpc.chain.getHeader(item.createdAtHash);
              const blockNumber = header.number.unwrap();
              try {
                if (location === 1) {
                  await bot.telegram.sendMessage(
                    profile.userId,
                    t(profile.lang).scene3.finish,
                  );
                  await bot.telegram.sendMessage(
                    profile.userId,
                    escape(
                      t(profile.lang)
                        .scene3.finish_desc.replace(
                          "__blockNumber__",
                          blockNumber,
                        )
                        .replace("__txIndex__", item.txIndex),
                    ),
                    {
                      parse_mode: "MarkdownV2",
                      ...Markup.inlineKeyboard([
                        Markup.button.callback(
                          t(profile.lang).scene3.button_next,
                          "next-scene-3",
                        ),
                      ]),
                    },
                  );
                  await bot.telegram.sendMessage(
                    process.env.GROUP_SUPPORT,
                    `Локация #1 пройдена. Пользователем @${profile.username} `,
                  );
                } else if (location === 2) {
                  await bot.telegram.sendMessage(
                    profile.userId,
                    t(profile.lang).scene5.finish,
                  );
                  await bot.telegram.sendMessage(
                    profile.userId,
                    escape(
                      t(profile.lang)
                        .scene5.finish_desc.replace(
                          "__blockNumber__",
                          blockNumber,
                        )
                        .replace("__txIndex__", item.txIndex),
                    ),
                    {
                      parse_mode: "MarkdownV2",
                      ...Markup.inlineKeyboard([
                        Markup.button.callback(
                          t(profile.lang).scene5.button_next,
                          "next-scene-55",
                        ),
                      ]),
                    },
                  );
                  await bot.telegram.sendMessage(
                    process.env.GROUP_SUPPORT,
                    `Локация #2 пройдена. Пользователем @${profile.username} `,
                  );
                } else if (location === 3) {
                  await bot.telegram.sendMessage(
                    profile.userId,
                    t(profile.lang).scene6.finish1,
                  );
                  await bot.telegram.sendMessage(
                    profile.userId,
                    t(profile.lang).scene6.finish2,
                  );
                  await bot.telegram.sendMessage(
                    profile.userId,
                    escape(
                      t(profile.lang)
                        .scene6.finish3.replace("__blockNumber__", blockNumber)
                        .replace("__txIndex__", item.txIndex),
                    ),
                    {
                      parse_mode: "MarkdownV2",
                    },
                  );
                  await bot.telegram.sendMessage(
                    process.env.GROUP_SUPPORT,
                    `Локация #3 пройдена. Пользователем @${profile.username} `,
                  );
                }
              } catch (error) {
                console.log(error);
              }
              profile.location = null;
              await profile.save();
              await Location.update(
                { status: STATUS.AVAIBLE },
                { where: { number: location } },
              );
            }
          }
        }
      }

      cb(null, true);
    },
    { store: store },
  );

  on(api, { section: "datalog", method: "NewRecord" }, async (results) => {
    const r = results
      .filter((item) => {
        return (
          item.createdAtHash &&
          item.success &&
          (item.data[0].toHuman() === process.env.CONTROLLER_1 ||
            item.data[0].toHuman() === process.env.CONTROLLER_2 ||
            item.data[0].toHuman() === process.env.CONTROLLER_3)
        );
      })
      .map((item) => {
        return {
          createdAtHash: item.createdAtHash.toHex(),
          txIndex: item.phase,
          controller: item.data[0].toHuman(),
          cid: item.data[2].toHuman(),
        };
      });
    queue.push(r);
  });
};
