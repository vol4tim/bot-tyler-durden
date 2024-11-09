import { Format, Scenes } from "telegraf";
import { t } from "../translate";

const Scene5Wizard = new Scenes.WizardScene("Scene5", async (ctx) => {
  await ctx.reply(Format.bold(t(ctx.session.lang).scene5.title));
});

export { Scene5Wizard };
