import db from "./db";

const SeasonPass = db.sequelize.define("season-pass", {
  key: {
    type: db.Sequelize.STRING,
    unique: true,
  },
  address: {
    type: db.Sequelize.STRING,
    unique: true,
  },
  tokenId: {
    type: db.Sequelize.STRING,
  },
  userIdActivate: {
    type: db.Sequelize.STRING,
  },
});

export default SeasonPass;
