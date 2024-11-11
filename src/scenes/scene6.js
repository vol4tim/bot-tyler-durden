import { Format, Scenes } from "telegraf";
import { t } from "../translate";

const Scene6Wizard = new Scenes.WizardScene("Scene6", async (ctx) => {
  await ctx.reply(Format.bold(t(ctx.session.lang).scene6.title));
});

export { Scene6Wizard };
