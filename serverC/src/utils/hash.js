import bcrypt from "bcryptjs";

export async function gerarHash(senha) {
  return await bcrypt.hash(senha, 10);
}
