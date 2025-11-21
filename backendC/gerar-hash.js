import bcrypt from "bcryptjs";

const senha = "123456";

bcrypt.hash(senha, 10).then(hash => {
  console.log("Hash gerado:", hash);
});
