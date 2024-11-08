import { Format, Markup, Scenes } from "telegraf";
import Location, { STATUS } from "../models/location";
import Profile from "../models/profile";
import { t } from "../translate";

const Scene2Wizard = new Scenes.WizardScene("Scene2", async (ctx) => {
  await ctx.reply(Format.bold(t(ctx.session.lang).scene2.title), {
    parse_mode: "MarkdownV2",
  });
  await ctx.reply(t(ctx.session.lang).scene2.text1);
  await ctx.reply(t(ctx.session.lang).scene2.text2);
  await ctx.reply(t(ctx.session.lang).scene2.text3);
  await ctx.reply(
    t(ctx.session.lang).scene2.text4,
    Markup.inlineKeyboard([
      Markup.button.callback(t(ctx.session.lang).scene2.button, "next-scene-2"),
      Markup.button.url(
        t(ctx.session.lang).scene2.group,
        "https://t.me/+vfwLjDqR7fs3MjI6",
      ),
    ]),
  );
});

export { Scene2Wizard };

Scene2Wizard.action("next-scene-2", async (ctx) => {
  const l = await Location.findOne({
    where: { number: 1 },
  });
  if (!l || l.status === STATUS.NOT_AVAIBLE) {
    await ctx.reply(t(ctx.session.lang).scene2.error);
    return;
  } else {
    l.status = STATUS.NOT_AVAIBLE;
    await l.save();
    await Profile.update(
      { location: 1 },
      { where: { userId: ctx.from.id.toString() } },
    );
  }
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.scene.leave();
  await ctx.scene.enter("Scene3");
});
