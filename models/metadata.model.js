import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const metadataModel = sequelize.define("metadata", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  movie_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  year: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  progress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  resume_metadata: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  quality: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default metadataModel;
