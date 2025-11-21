//Rode no terminal: npm install bcryptjs

//no terminal: gerar-hash.js

const bcrypt = require("bcryptjs");

const senha = "123789";

bcrypt.hash(senha, 10).then(hash => {
  console.log("Hash gerado:", hash);
});
