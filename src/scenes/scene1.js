import { ethers } from "ethers";
import { Composer, Format, Markup, Scenes } from "telegraf";
import nft_abi from "../abi/NFT.json";
import SeasonPass from "../models/seasonPass";
import { getInstance as getInstanceEthereum } from "../tools/ethereum";
import { t } from "../translate";

const verifyMessage = ({ message, address, signature }) => {
  try {
    const signerAddr = ethers.verifyMessage(message, signature);
    if (signerAddr !== ethers.getAddress(address)) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

const findActivatedToken = async (account, nftContract) => {
  const balance = await nftContract.balanceOf(account);
  const ids = [];
  for (let index = 0; index < balance; index++) {
    try {
      const tokenId = await nftContract.tokenOfOwnerByIndex(account, index);
      ids.push({
        activated: await nftContract.activatedOf(tokenId),
        tokenId: tokenId.toString(),
      });
    } catch (error) {
      console.log(error);
    }
  }
  return ids.find((token) => token.activated);
};

const stepHandler = new Composer();

stepHandler.action("send", async (ctx) => {
  // await ctx.answerCbQuery();
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.reply(`Укажите ваш адрес`);
  return ctx.wizard.next();
});

stepHandler.use(() => {
  return;
});

const Scene1Wizard = new Scenes.WizardScene(
  "Scene1",
  async (ctx) => {
    await ctx.reply(Format.bold(t(ctx.session.lang).scene1.title));
    await ctx.reply(t(ctx.session.lang).scene1.text1);
    await ctx.reply(t(ctx.session.lang).scene1.text2);
    await ctx.reply(t(ctx.session.lang).scene1.text3);
    await ctx.reply(t(ctx.session.lang).scene1.text4);
    await ctx.reply(t(ctx.session.lang).scene1.text5);
    await ctx.reply(t(ctx.session.lang).scene1.text6);
    await ctx.reply(
      Format.bold(t(ctx.session.lang).scene1.desc),
      Markup.inlineKeyboard([
        Markup.button.callback(t(ctx.session.lang).scene1.button, "send"),
      ]),
    );
    return ctx.wizard.next();
  },
  stepHandler,
  async (ctx) => {
    const addressAccount = ctx.message?.text;

    if (!ethers.isAddress(addressAccount)) {
      await ctx.reply(
        "Указан не валидный адрес",
        Markup.inlineKeyboard([Markup.button.callback("Exit", "exit")]),
      );
      return;
    }

    const seasonPass = await SeasonPass.findOne({
      where: { address: addressAccount },
    });
    if (seasonPass) {
      await ctx.reply(
        "Пропуск уже активирован",
        Markup.inlineKeyboard([
          Markup.button.callback("Следующая сцена", "next-scene-1"),
        ]),
      );
      return;
    }

    const provider = getInstanceEthereum();
    const nftContract = new ethers.Contract(
      process.env.CONTRACTS_NFT,
      nft_abi,
      provider,
    );

    const act = await findActivatedToken(addressAccount, nftContract);
    if (!act) {
      await ctx.reply(
        "У вас нет активированого пропуска",
        Markup.inlineKeyboard([Markup.button.callback("Exit", "exit")]),
      );
      return;
    }

    ctx.session.tokenId = act.tokenId;
    ctx.session.addressAccount = addressAccount;

    await ctx.reply(
      `Укажите подпись`,
      Markup.inlineKeyboard([Markup.button.callback("Exit", "exit")]),
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.message || !ctx.message.text) {
      await ctx.reply(
        "Error",
        Markup.inlineKeyboard([Markup.button.callback("Exit", "exit")]),
      );
      return;
    }

    const isValid = verifyMessage({
      message: "Я обезьянка-космонавт!",
      address: ctx.session.addressAccount,
      signature: ctx.message.text,
    });

    if (!isValid) {
      await ctx.reply(
        "Пропуск не действителен",
        Markup.inlineKeyboard([Markup.button.callback("Exit", "exit")]),
      );
      return;
    }

    await SeasonPass.create({
      address: ctx.session.addressAccount,
      tokenId: ctx.session.tokenId,
    });

    await ctx.reply(
      t(ctx.session.lang).scene1.text7,
      Markup.inlineKeyboard([
        Markup.button.callback(
          t(ctx.session.lang).scene1.button_next,
          "next-scene-1",
        ),
      ]),
    );
    return ctx.wizard.next();
  },
);

Scene1Wizard.action("next-scene-1", async (ctx) => {
  await ctx.editMessageReplyMarkup(undefined);
  await ctx.scene.leave();
  await ctx.scene.enter("Scene2");
});
Scene1Wizard.action("exit", async (ctx) => {
  await ctx.editMessageReplyMarkup(undefined);
  return await ctx.scene.leave();
});

export { Scene1Wizard };
