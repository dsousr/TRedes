import express from "express";
import routes from "./routes.js";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(sessionMiddleware);
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Backend rodando na porta " + PORT);
});
