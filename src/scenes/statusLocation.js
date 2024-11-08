import { Markup, Scenes } from "telegraf";
import bot from "../bot";
import Location from "../models/location";

const StatusLocationWizard = new Scenes.WizardScene(
  "StatusLocation",
  async (ctx) => {
    await ctx.reply(
      `Номер квеста`,
      Markup.inlineKeyboard([Markup.button.callback("Cancel", "cancel")]),
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.message || !ctx.message.text) {
      await ctx.reply(
        "Error",
        Markup.inlineKeyboard([Markup.button.callback("Cancel", "cancel")]),
      );
      return;
    }

    const l = await Location.findOne({
      where: { number: ctx.message.text },
    });

    await ctx.reply(
      `Текущий статус: ${l.status}`,
      Markup.inlineKeyboard([Markup.button.callback("Cancel", "cancel")]),
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.message || !ctx.message.text) {
      await ctx.reply(
        "Error",
        Markup.inlineKeyboard([Markup.button.callback("Cancel", "cancel")]),
      );
      return;
    }

    const l = await Location.findOne({
      where: { number: ctx.message.text },
    });

    await ctx.reply(
      `Текущий статус: ${l.status}`,
      Markup.inlineKeyboard([Markup.button.callback("Cancel", "cancel")]),
    );
    return ctx.wizard.next();
  },
);

StatusLocationWizard.action("cancel", async (ctx) => {
  await ctx.deleteMessage();
  return await ctx.scene.leave();
});

export { StatusLocationWizard };

export function statusLocation() {
  bot.command("status", async (ctx) => {
    await ctx.scene.enter("StatusLocation");
  });
}
