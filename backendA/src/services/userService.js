import db from "../config/db.js";
import bcrypt from "bcryptjs";

export default {
  async validate(login, senha) {
    console.log("➡ Validando login:", login); // <-- ADICIONE

    const sql = "SELECT * FROM usuarios WHERE login = ?";
    const [rows] = await db.query(sql, [login]);

    console.log("➡ Resultado do SELECT:", rows); // <-- ADICIONE

    if (rows.length === 0) return null;

    const user = rows[0];
    const ok = await bcrypt.compare(senha, user.senha_hash);

    console.log("➡ Comparação da senha:", ok); // <-- ADICIONE

    return ok ? user : null;
  }
};
