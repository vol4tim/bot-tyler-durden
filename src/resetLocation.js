import { Markup } from "telegraf";
import bot from "./bot";
import Location, { STATUS } from "./models/location";
import Profile from "./models/profile";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const resetLocation = async () => {
  const locations = await Location.findAll({
    where: { status: STATUS.NOT_AVAIBLE },
  });
  for (const location of locations) {
    if (
      location.number === 1 &&
      new Date(location.updatedAt).getTime() + 1000 * 60 * 25 < Date.now()
    ) {
      const profile = await Profile.findOne({
        where: { location: location.number },
      });
      if (profile) {
        await bot.telegram.sendMessage(
          profile.userId,
          `You did not have time to complete the location. To complete it, you will need to book the location again.`,
          Markup.inlineKeyboard([
            Markup.button.callback("Back", "back-scene-3"),
          ]),
        );
        profile.location = null;
        await profile.save();
      }
      await Location.update(
        { status: STATUS.AVAIBLE },
        { where: { number: location.number } },
      );
    } else if (
      location.number === 2 &&
      new Date(location.updatedAt).getTime() + 1000 * 60 * 45 < Date.now()
    ) {
      const profile = await Profile.findOne({
        where: { location: location.number },
      });
      if (profile) {
        await bot.telegram.sendMessage(
          profile.userId,
          `You did not have time to complete the location. To complete it, you will need to book the location again.`,
          Markup.inlineKeyboard([
            Markup.button.callback("Back", "back-scene-3"),
          ]),
        );
        profile.location = null;
        await profile.save();
      }
      await Location.update(
        { status: STATUS.AVAIBLE },
        { where: { number: location.number } },
      );
    }
  }
  await sleep(5000);
  await resetLocation();
};
