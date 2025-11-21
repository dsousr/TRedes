import sessionService from "../services/sessionService.js";

export default {
  async profile(req, res) {
    const session = await sessionService.getSession(req.sessionId);

    res.json({
      usuario: session.nome,
      login: session.login,
      logadoEm: session.logadoEm,
      sessionId: req.sessionId,
      servidor: process.env.HOSTNAME || "local"
    });
  }
};
