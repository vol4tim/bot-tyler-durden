import "./config";

import { SQLite } from "@telegraf/session/sqlite";
import { Scenes, session } from "telegraf";
import bot from "./bot";
import db from "./models/db";
import { PATH_SESSION_DB } from "./paths";
import { RunWizard } from "./scenes/run";
import { Scene1Wizard } from "./scenes/scene1";
import { Scene2Wizard } from "./scenes/scene2";
import { Scene3Wizard } from "./scenes/scene3";
import { Scene4Wizard } from "./scenes/scene4";
import { start } from "./scenes/start";
import { StatusLocationWizard, statusLocation } from "./scenes/statusLocation";
import { watcher } from "./watcher";

const runApp = () => {
  // bot.use(session());
  const store = SQLite({
    filename: PATH_SESSION_DB,
  });
  bot.use(
    session({
      store,
      defaultSession: () => ({}),
    }),
  );

  const stage = new Scenes.Stage([
    RunWizard,
    Scene1Wizard,
    Scene2Wizard,
    Scene3Wizard,
    Scene4Wizard,
    StatusLocationWizard,
  ]);
  bot.use(stage.middleware());

  start();
  statusLocation();

  bot.launch();
};

db.sequelize.sync().then(async () => {
  runApp();
  await watcher();
});
