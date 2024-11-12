import path from "path";
import { Format, Markup, Scenes } from "telegraf";
import bot from "../bot";
import Attempts from "../models/attempts";
import Location, { STATUS } from "../models/location";
import Profile from "../models/profile";
import { t } from "../translate";

const Scene4Wizard = new Scenes.WizardScene("Scene4", async (ctx) => {
  await ctx.reply(Format.bold(t(ctx.session.lang).scene4.title));
  let lang = "en";
  if (ctx.session.lang) {
    lang = ctx.session.lang;
  }
  await ctx.replyWithAudio({
    source: path.resolve(__dirname, `../media/${lang}/4.mp3`),
  });
  await ctx.reply(t(ctx.session.lang).scene4.text1);
  await ctx.reply(t(ctx.session.lang).scene4.text2);
  await ctx.reply(t(ctx.session.lang).scene4.text3);
  await ctx.reply(t(ctx.session.lang).scene4.text4);
  await ctx.reply(
    t(ctx.session.lang).scene4.text5,
    Markup.inlineKeyboard([
      Markup.button.callback(t(ctx.session.lang).scene4.button, "next-scene-4"),
    ]),
  );
});

export { Scene4Wizard };

Scene4Wizard.action("next-scene-4", async (ctx) => {
  const l = await Location.findOne({
    where: { number: 2 },
  });
  if (!l || l.status === STATUS.NOT_AVAIBLE) {
    await ctx.reply(t(ctx.session.lang).scene4.error);
    return;
  } else {
    l.status = STATUS.NOT_AVAIBLE;
    await l.save();
    await Profile.update(
      { location: 2 },
      { where: { userId: ctx.from.id.toString() } },
    );
    await Attempts.create({
      userId: ctx.from.id.toString(),
      location: 2,
    });

    const profile = await Profile.findOne({
      where: { userId: ctx.from.id.toString() },
    });
    if (profile) {
      await bot.telegram.sendMessage(
        process.env.GROUP_SUPPORT,
        `Активирована локация #2. Пользователем @${profile.username} `,
      );
    }
  }
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.reply(t(ctx.session.lang).scene4.activated);
  await ctx.scene.leave();
  await ctx.scene.enter("Scene5");
});
