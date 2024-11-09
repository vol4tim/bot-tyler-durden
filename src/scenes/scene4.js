import { Format, Markup, Scenes } from "telegraf";
import Location, { STATUS } from "../models/location";
import Profile from "../models/profile";
import { t } from "../translate";

const Scene4Wizard = new Scenes.WizardScene("Scene4", async (ctx) => {
  await ctx.reply(Format.bold(t(ctx.session.lang).scene4.title));
  await ctx.reply(t(ctx.session.lang).scene4.text1);
  await ctx.reply(t(ctx.session.lang).scene4.text2);
  await ctx.reply(t(ctx.session.lang).scene4.text3);
  await ctx.reply(t(ctx.session.lang).scene4.text4);
  await ctx.reply(
    t(ctx.session.lang).scene4.text5,
    Markup.inlineKeyboard([
      Markup.button.callback(t(ctx.session.lang).scene4.button, "next-scene-4"),
      Markup.button.url(
        t(ctx.session.lang).scene4.group,
        "https://t.me/+vfwLjDqR7fs3MjI6",
      ),
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
  }
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.reply(t(ctx.session.lang).scene4.activated);
  // await ctx.scene.leave();
  // await ctx.scene.enter("Scene5");
});
Scene4Wizard.action("next-scene-44", async (ctx) => {
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.scene.leave();
  // await ctx.scene.enter("Scene5");
});
Scene4Wizard.action("back-scene-4", async (ctx) => {
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.scene.leave();
  await ctx.scene.enter("Scene4");
});
