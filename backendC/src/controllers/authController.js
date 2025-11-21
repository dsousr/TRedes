import userService from "../services/userService.js";
import sessionService from "../services/sessionService.js";

export default {
  async login(req, res) {
    const { login, senha } = req.body;

    const user = await userService.validate(login, senha);
    if (!user) return res.status(401).json({ erro: "Credenciais inválidas" });

    const sessionId = await sessionService.createSession(user);

    res.json({
      sessionId,
      mensagem: "Login realizado com sucesso"
    });
  }
};
