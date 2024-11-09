import { Markup } from "telegraf";
import bot from "./bot";
import Location, { STATUS } from "./models/location";
import Profile from "./models/profile";
import { getApi, on } from "./tools/polkadot";

export const watcher = async () => {
  const api = await getApi(process.env.ENDPOINT_PARACHAIN);

  on(api, { section: "datalog", method: "NewRecord" }, async (results) => {
    const r = results
      .filter((item) => {
        return (
          item.createdAtHash &&
          item.success &&
          (item.data[0].toHuman() === process.env.CONTROLLER_1 ||
            item.data[0].toHuman() === process.env.CONTROLLER_2)
        );
      })
      .map((item) => {
        return {
          createdAtHash: item.createdAtHash,
          txIndex: item.phase,
          controller: item.data[0].toHuman(),
          cid: item.data[2].toHuman(),
        };
      });
    for (const item of r) {
      if (item.cid.split("next_location").length >= 2) {
        let location;
        if (item.controller === process.env.CONTROLLER_1) {
          location = 1;
        } else if (item.controller === process.env.CONTROLLER_2) {
          location = 2;
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
                  `Looks like you did it! Here are the coordinates for the next location: 13.7216119,100.5648836\nIn Robonomics: https://robonomics.subscan.io/extrinsic/${blockNumber}-${item.txIndex}`,
                  // `Кажись у тебя получилось!\nВот координаты следующей локации: 13.7216119,100.5648836\nЗапись в Робономике: https://robonomics.subscan.io/extrinsic/${blockNumber}-${txIndex}`,
                  Markup.inlineKeyboard([
                    Markup.button.callback("Next scene", "next-scene-3"),
                  ]),
                );
              } else if (location === 2) {
                await bot.telegram.sendMessage(
                  profile.userId,
                  `Looks like you did it! Here are the coordinates for the next location: 13.7176564,100.5668314\nIn Robonomics: https://robonomics.subscan.io/extrinsic/${blockNumber}-${item.txIndex}`,
                  Markup.inlineKeyboard([
                    Markup.button.callback("Next scene", "next-scene-44"),
                  ]),
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
  });
};
