import conn from "../config/conn.js";
import { DataTypes } from "sequelize";

const Post = conn.define(
  "postagens",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    post: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    descricao: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "postagens",
  }
);

export default Post;