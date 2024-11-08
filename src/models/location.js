import db from "./db";

const Location = db.sequelize.define("location", {
  number: {
    type: db.Sequelize.INTEGER,
  },
  status: {
    type: db.Sequelize.INTEGER,
  },
});

export default Location;

export const STATUS = {
  AVAIBLE: 1,
  NOT_AVAIBLE: 2,
};
