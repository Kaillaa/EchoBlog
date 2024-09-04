import { Sequelize } from "sequelize";

const conn = new Sequelize("todo3E", "root", "Sen@iDev77!.", {
  host: "localhost",
  dialect: "mysql",
});

export default conn;
