import "dotenv/config";
import express from "express";
import cors from "cors";

// Importar os Modelos
import Post from "./models/blogModel.js";

// Importação das rotas
import routerPosts from "./routes/blogRouters.js";

const PORT = process.env.PORT || 3333;

const app = express();

// Importar conexão do banco
import conn from "./config/conn.js";

// 3 Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Conexão com o banco
conn
  .sync()
  .then(() => {
    console.log("Olá, Mundo!")
    app.listen(PORT, () => {
      console.log("🛵 Servidor rodando na port:", PORT);
    });
  })
  .catch((err) => console.error(err));

// Utilizando Rotas
app.use("/posts", routerPosts);

app.use((request, response) => {
  response.status(404).json({ msg: "Rota não encontrada" });
});
