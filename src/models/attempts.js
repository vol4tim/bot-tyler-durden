import db from "./db";

const Attempts = db.sequelize.define("attempts", {
  userId: {
    type: db.Sequelize.STRING,
  },
  location: {
    type: db.Sequelize.INTEGER,
  },
});

export default Attempts;
