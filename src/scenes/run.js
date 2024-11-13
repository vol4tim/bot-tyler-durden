import { Composer, Format, Markup, Scenes } from "telegraf";
import Profile from "../models/profile";

const stepHandler = new Composer();

stepHandler.action(/^lang-([a-z]+)$/, async (ctx) => {
  const lang = ctx.match[1];
  ctx.session.lang = lang;
  await Profile.update(
    { lang: lang },
    {
      where: { userId: ctx.from.id.toString() },
    },
  );
  await ctx.scene.leave();
  await ctx.scene.enter("Scene1");
});

stepHandler.use(() => {
  return;
});

const RunWizard = new Scenes.WizardScene(
  "Run",
  async (ctx) => {
    await ctx.reply(Format.bold(`City Quest "Cyberpunk && Bangkok”`));
    await ctx.reply(
      `Select your language`,
      Markup.inlineKeyboard([
        Markup.button.callback("English", "lang-en"),
        Markup.button.callback("Русский", "lang-ru"),
        Markup.button.callback("中文", "lang-ch"),
        Markup.button.callback("한국어", "lang-ko"),
      ]),
    );
    return ctx.wizard.next();
  },
  stepHandler,
);

export { RunWizard };
