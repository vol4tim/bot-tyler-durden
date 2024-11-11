import { Markup } from "telegraf";
import bot from "./bot";
import Attempts from "./models/attempts";
import Location, { STATUS } from "./models/location";
import Profile from "./models/profile";
import { t } from "./translate";

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
        const attempts = await Attempts.findAll({
          where: { userId: profile.userId, location: location.number },
        });
        if (attempts.length === 1) {
          await bot.telegram.sendMessage(
            profile.userId,
            t(profile.lang).scene2.reset,
            Markup.inlineKeyboard([
              Markup.button.callback(
                t(profile.lang).scene2.button_reset,
                "repeat-scene-2",
              ),
            ]),
          );
        } else {
          await bot.telegram.sendMessage(
            profile.userId,
            t(profile.lang).scene2.gameover,
            Markup.inlineKeyboard([
              Markup.button.url(
                t(profile.lang).scene3.group,
                "https://t.me/RoboQuestSupport",
              ),
            ]),
          );
        }
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
        const attempts = await Attempts.findAll({
          where: { userId: profile.userId, location: location.number },
        });
        if (attempts.length === 1) {
          await bot.telegram.sendMessage(
            profile.userId,
            t(profile.lang).scene5.reset,
            Markup.inlineKeyboard([
              Markup.button.callback(
                t(profile.lang).scene5.button_reset,
                "repeat-scene-4",
              ),
            ]),
          );
        } else {
          await bot.telegram.sendMessage(
            profile.userId,
            t(profile.lang).scene5.gameover,
          );
        }
        profile.location = null;
        await profile.save();
      }
      await Location.update(
        { status: STATUS.AVAIBLE },
        { where: { number: location.number } },
      );
    } else if (
      location.number === 3 &&
      new Date(location.updatedAt).getTime() + 1000 * 60 * 25 < Date.now()
    ) {
      const profile = await Profile.findOne({
        where: { location: location.number },
      });
      if (profile) {
        const attempts = await Attempts.findAll({
          where: { userId: profile.userId, location: location.number },
        });
        if (attempts.length === 1) {
          await bot.telegram.sendMessage(
            profile.userId,
            t(profile.lang).scene6.reset,
            Markup.inlineKeyboard([
              Markup.button.callback(
                t(profile.lang).scene6.button_reset,
                "next-scene-6",
              ),
            ]),
          );
        } else {
          await bot.telegram.sendMessage(
            profile.userId,
            t(profile.lang).scene6.gameover,
          );
        }
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
