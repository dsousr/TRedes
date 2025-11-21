import redis from "../config/redis.js";
import crypto from "crypto";

export default {
  async createSession(user) {
    const id = crypto.randomBytes(16).toString("hex");
    const data = {
      id,
      nome: user.nome,
      login: user.login,
      logadoEm: new Date().toISOString()
    };

    await redis.set(id, JSON.stringify(data), "EX", 60 * 60); // 1h

    return id;
  },

  async getSession(id) {
    const raw = await redis.get(id);
    return raw ? JSON.parse(raw) : null;
  }
};
