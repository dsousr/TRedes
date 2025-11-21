import bcrypt from "bcryptjs";

const senha = "654321";

bcrypt.hash(senha, 10).then(hash => {
  console.log("Hash gerado:", hash);
});
