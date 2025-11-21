import sessionService from "../services/sessionService.js";

export default async (req, res, next) => {
  if (!req.sessionId)
    return res.status(401).json({ erro: "Sessão ausente" });

  const data = await sessionService.getSession(req.sessionId);
  if (!data)
    return res.status(401).json({ erro: "Sessão inválida" });

  req.user = data;
  next();
};
