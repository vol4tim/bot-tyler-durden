import path from "path";
import { Format, Markup, Scenes } from "telegraf";
import { t } from "../translate";

const Scene5Wizard = new Scenes.WizardScene("Scene5", async (ctx) => {
  await ctx.reply(Format.bold(t(ctx.session.lang).scene5.title));
  await ctx.reply(t(ctx.session.lang).scene5.text1);
  let lang = "en";
  if (ctx.session.lang) {
    lang = ctx.session.lang;
  }
  await ctx.replyWithAudio({
    source: path.resolve(__dirname, `../media/${lang}/4_braindance.mp3`),
  });
  await ctx.reply(t(ctx.session.lang).scene5.text2);
  await ctx.reply(
    t(ctx.session.lang).scene5.text3,
    Markup.inlineKeyboard([
      Markup.button.url(
        t(ctx.session.lang).scene5.group,
        "https://t.me/bkkQuestSupport",
      ),
    ]),
  );
});

export { Scene5Wizard };

Scene5Wizard.action("repeat-scene-4", async (ctx) => {
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.scene.leave();
  await ctx.scene.enter("Scene4");
});
Scene5Wizard.action("next-scene-55", async (ctx) => {
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.scene.leave();
  await ctx.scene.enter("Scene6");
});
