import express from "express";
import routes from "./routes.js";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(sessionMiddleware);

// ROTA DE HEALTH-CHECK
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Rotas principais
app.use(routes);

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || "0.0.0.0";

app.listen(PORT, IP, () => {
  console.log(`Servidor ${process.env.HOSTNAME} rodando em ${IP}:${PORT}`);
});
