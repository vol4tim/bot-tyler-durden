import { Format, Markup, Scenes } from "telegraf";
import bot from "../bot";
import Attempts from "../models/attempts";
import Location, { STATUS } from "../models/location";
import Profile from "../models/profile";
import { t } from "../translate";

const Scene6Wizard = new Scenes.WizardScene("Scene6", async (ctx) => {
  await ctx.reply(Format.bold(t(ctx.session.lang).scene6.title));
  await ctx.reply(
    t(ctx.session.lang).scene6.text1,
    Markup.inlineKeyboard([
      Markup.button.callback(t(ctx.session.lang).scene6.button, "next-scene-6"),
      Markup.button.url(
        t(ctx.session.lang).scene6.group,
        "https://t.me/RoboQuestSupport",
      ),
    ]),
  );
});

export { Scene6Wizard };

Scene6Wizard.action("next-scene-6", async (ctx) => {
  const l = await Location.findOne({
    where: { number: 3 },
  });
  if (!l || l.status === STATUS.NOT_AVAIBLE) {
    await ctx.reply(t(ctx.session.lang).scene6.error);
    return;
  } else {
    l.status = STATUS.NOT_AVAIBLE;
    await l.save();
    await Profile.update(
      { location: 3 },
      { where: { userId: ctx.from.id.toString() } },
    );
    await Attempts.create({
      userId: ctx.from.id.toString(),
      location: 3,
    });

    const profile = await Profile.findOne({
      where: { userId: ctx.from.id.toString() },
    });
    if (profile) {
      await bot.telegram.sendMessage(
        process.env.GROUP_SUPPORT,
        `Активирована локация #3. Пользователем @${profile.username} `,
      );
    }
  }
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.reply(t(ctx.session.lang).scene6.activated);
  // await ctx.scene.leave();
  // await ctx.scene.enter("Scene5");
});

Scene6Wizard.action("repeat-scene-6", async (ctx) => {
  await ctx.editMessageReplyMarkup(undefined);
  // await ctx.scene.leave();
  await ctx.scene.enter("Scene4");
});
