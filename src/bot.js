import { Telegraf } from "telegraf";

const options = {};
const bot = new Telegraf(process.env.BOT_TOKEN, options);

export default bot;
