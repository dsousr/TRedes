export default (req, res, next) => {
  req.sessionId = req.headers["x-session-id"];
  next();
};
