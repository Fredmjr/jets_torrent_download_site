import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const movieModel = sequelize.define("movies", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "Not Set",
  },
  year: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "Not Set",
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "Not Set",
  },
  magnets: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

export default movieModel;
