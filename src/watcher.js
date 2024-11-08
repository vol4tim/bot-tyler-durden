import { Markup } from "telegraf";
import bot from "./bot";
import Location, { STATUS } from "./models/location";
import Profile from "./models/profile";
import { getApi, on } from "./tools/polkadot";

export const watcher = async () => {
  const api = await getApi(process.env.ENDPOINT_PARACHAIN);

  on(api, { section: "datalog", method: "NewRecord" }, async (results) => {
    const r = results.filter((item) => {
      return (
        item.success && item.data[0].toHuman() === process.env.CONTRACTS_NFT
      );
    });
    let updateTime = null;
    let cid = null;
    let txIndex = null;
    let createdAtHash = null;
    for (const item of r) {
      createdAtHash = item.createdAtHash;
      txIndex = item.phase;
      updateTime = item.data[1].toNumber();
      cid = item.data[2].toHuman();
    }
    if (updateTime && cid) {
      const profile = await Profile.findOne({ where: { location: 1 } });
      if (profile) {
        const header = await api.rpc.chain.getHeader(createdAtHash);
        const blockNumber = header.number.unwrap();
        await bot.telegram.sendMessage(
          profile.userId,
          `Кажись у тебя получилось!\nВот координаты следующей локации: 13.7216119,100.5648836\nЗапись в Робономике: https://robonomics.subscan.io/extrinsic/${blockNumber}-${txIndex}`,
          Markup.inlineKeyboard([
            Markup.button.callback("Следующая сцена", "next-scene-3"),
          ]),
        );
        profile.location = null;
        await profile.save();
        await Location.update(
          { status: STATUS.AVAIBLE },
          { where: { number: 1 } },
        );
      }
    }
  });
};

// db.sequelize.sync().then(() => {
//   runApp();
// });
