import express from "express";
import routes from "./routes.js";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import db from "./config/db.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);
app.use(routes);

// TESTE PARA SABER QUAL BANCO O BACKEND ESTÁ USANDO
(async () => {
  try {
    const [rows] = await db.query("SELECT DATABASE() AS db, NOW() AS agora");
    console.log("MySQL conectado em:", rows[0].db, "| Hora:", rows[0].agora);
  } catch (err) {
    console.error("Erro ao testar conexão com o banco:", err);
  }
})();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Backend rodando na porta " + PORT);
});
