import path from "path";
import { Format, Scenes } from "telegraf";
import { t } from "../translate";

const Scene3Wizard = new Scenes.WizardScene("Scene3", async (ctx) => {
  await ctx.reply(Format.bold(t(ctx.session.lang).scene3.title));
  let lang = "en";
  if (ctx.session.lang) {
    lang = ctx.session.lang;
  }
  await ctx.replyWithAudio({
    source: path.resolve(__dirname, `../media/${lang}/3.mp3`),
  });
  await ctx.reply(t(ctx.session.lang).scene3.text1);
  await ctx.reply(t(ctx.session.lang).scene3.text2);
  await ctx.reply(t(ctx.session.lang).scene3.text3);
  await ctx.reply(t(ctx.session.lang).scene3.text4);
  await ctx.reply(t(ctx.session.lang).scene3.text5);
});

export { Scene3Wizard };

Scene3Wizard.action("next-scene-3", async (ctx) => {
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.scene.leave();
  await ctx.scene.enter("Scene4");
});
