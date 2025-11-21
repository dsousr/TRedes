# Sistema de Autenticação Distribuído com Balanceamento de Carga

## 📌 Descrição do Projeto

Este projeto implementa um sistema de autenticação distribuído, composto por três servidores backend, um frontend em React, um banco MySQL, um servidor de sessões em Redis, e um DNS configurado com Round-Robin para balanceamento de carga.

O objetivo é demonstrar:

Distribuição de carga entre múltiplos servidores;

Persistência de sessão centralizada com Redis;

Armazenamento seguro de senhas com bcrypt;

Comunicação entre frontend e servidores backend distintos;

Arquitetura escalável, estável e resistente a falhas.

## 🧩 Arquitetura Geral
                ┌──────────────────────┐
                │     FRONTEND (React) │
                └─────────────┬────────┘
                              │
                       DNS Round-Robin
                              │
   ┌──────────────────────────┼──────────────────────────┐
   │                          │                          │
┌───────┐                ┌───────┐                ┌───────┐
│BACKEND│ A (3001)       │BACKEND│ B (3002)       │BACKEND│ C (3003)
└───┬───┘                └───┬───┘                └───┬───┘
    │                        │                        │
    └──────────────┬─────────┴──────────────┬─────────┘
                   │                        │
                ┌───────┐            ┌──────────┐
                │ MySQL │            │  Redis   │
                └───────┘            └──────────┘

## ⚙️ Tecnologias Utilizadas
Backend

Node.js + Express

MySQL (armazenamento de usuários)

Redis (armazenamento das sessões)

bcryptjs (hash de senhas)

dotenv (configuração .env)

ioredis (client Redis)

Frontend

React + Vite

React Router DOM

Fetch API

Sistema de fallback automático para os 3 servidores

Infraestrutura

Servidor DNS configurado com Round-Robin

Arquivo db.meutrabalho.com.br apontando para 3 servidores diferentes

## 📂 Estrutura de Pastas
backendA / backendB / backendC
│ src
│   ├ config
│   │   ├ db.js
│   │   └ redis.js
│   ├ controllers
│   │   ├ authController.js
│   │   └ profileController.js
│   ├ middlewares
│   │   ├ authMiddleware.js
│   │   └ sessionMiddleware.js
│   ├ services
│   │   ├ userService.js
│   │   └ sessionService.js
│   ├ utils
│   │   └ hash.js
│   ├ server.js
│   └ routes.js
│ .env

frontend (design)
│ src
│   ├ assets
│   ├ api.js
│   ├ App.jsx
│   ├ main.jsx
│   └ pages
│       ├ auth
│       └ home

## 🗄️ Banco de Dados (MySQL)
Estrutura:
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  login VARCHAR(50) UNIQUE NOT NULL,
  senha_hash VARCHAR(200) NOT NULL,
  nome VARCHAR(100) NOT NULL
);

Inserção de usuários:
INSERT INTO usuarios (login, senha_hash, nome)
VALUES
('pedro', '<hash bcrypt>', 'Pedro'),
('admin', '<hash bcrypt>', 'Administrador');

## 🔐 Fluxo de Login

O usuário envia login e senha para o backend.

O backend valida o login no MySQL.

A senha é comparada via bcrypt.compare().

Caso válido:

Cria sessão no Redis.

Retorna sessionId.

O frontend salva o sessionId no localStorage.

As próximas requisições enviam x-session-id no header.

## 🧠 Sessões com Redis

Cada sessão no Redis contém:

{
  "id": "abc123",
  "nome": "Pedro",
  "login": "pedro",
  "logadoEm": "2025-11-21T00:12:00.000Z"
}


Expira automaticamente em 1 hora.

## 🌐 DNS (Round-Robin)

Arquivo db.meutrabalho.com.br:

www     IN A 10.0.0.11
www     IN A 10.0.0.12
www     IN A 10.0.0.13


Cada nova requisição pode cair em um servidor diferente:

backendA (serverA)

backendB (serverB)

backendC (serverC)

O endpoint /meu-perfil informa qual servidor respondeu:

{
  "usuario": "Pedro",
  "logadoEm": "...",
  "servidor": "serverB"
}

## 🖥️ Frontend (React)

O frontend possui fallback automático:

api.js
export const API_URLS = [
  "http://localhost:3003",
  "http://localhost:3002",
  "http://localhost:3001"
];

export async function apiFetch(path, options = {}) {
  for (const base of API_URLS) {
    try {
      const res = await fetch(base + path, options);
      if (res.ok) return res;
    } catch (_) {}
  }
  
  throw new Error("Nenhum servidor disponível");
}

✔ Se o servidor C cair → tenta o B
✔ Se o B cair → tenta o A
✔ Se todos caem → aparece erro de conexão
🏠 Tela inicial (Home)

Exibe:

usuário logado

horário do login

sessão usada

servidor que atendeu a requisição

tudo vindo da API distribuída

## 🚀 Como Executar

🔧 1) Subir MySQL

Criar banco trabalho
Executar init.sql

🔧 2) Subir Redis

Porta padrão: 6379

🔧 3) Iniciar cada backend
cd backendA
npm run dev

cd backendB
npm run dev

cd backendC
npm run dev

🔧 4) Iniciar o frontend
cd design
npm run dev

## 🎉 Status Final do Projeto

✔ Login funcionando

✔ Hash de senha

✔ Sessões distribuídas

✔ Redis funcional

✔ MySQL funcional

✔ DNS configurado

✔ Frontend com fallback

✔ Três servidores independentes

✔ Projeto completamente funcional