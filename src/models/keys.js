import db from "./db";

const Keys = db.sequelize.define("keys", {
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

export default Keys;
