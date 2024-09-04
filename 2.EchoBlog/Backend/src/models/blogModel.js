import conn from "../config/conn.js";
import { DataTypes } from "sequelize";

const Post = conn.define(
  "posts",
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
    descricao: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM, values: ["pendente", "concluida"] },
  },
  {
    tableName: "posts",
  }
);

export default Post;