# Sistema de Autenticação Distribuído com Balanceamento de Carga

## Descrição do Projeto:

Sistema de autenticação distribuído composto por três servidores backend, frontend em React vite, MySQL, Redis para sessões e DNS com Round-Robin. Demonstra:

● Distribuição de carga

● Sessões centralizadas via Redis

● Hash seguro de senhas (bcrypt)

● Comunicação entre múltiplos servidores

● Arquitetura escalável e tolerante a falhas

## Tecnologias Utilizadas:

### Backend

● Node.js + Express

● MySQL

● Redis

● bcryptjs

● dotenv

● ioredis

### Frontend

● React + Vite

● React Router DOM

● Fetch API

● fallback automático entre os 3 backends

### Infraestrutura

● DNS Round-Robin

● Três servidores distintos apontando para o mesmo domínio
➥ serverA, serverB, serverC

## Estrutura de Pastas:

ServerX (serverA, serverB, serverC):
  ● .env
  ➜ src
      ➜ config
          ● db.js
          ● redis.js
      ➜ controllers
          ● authController.js
          ● profileController.js
      ➜ middlewares
          ● authMiddleware.js
          ● sessionMiddleware.js
      ➜ services
          ● userService.js
          ● sessionService.js
      ➜ utils
          ● hash.js
      ● routes.js
      ● server.js

frontend (design):
  ➜ src
      ➜ assets (imagens...)
      ● api.js
      ● App.jsx
      ● main.jsx
      ➜ pages
          ➜ auth
          ➜ home

infra (in):
  ➜ db
    ● init.sql
  ➜ session
      ● serverA.env
      ● serverB.env
      ● serverC.env

## Banco de Dados (MySQL workbench):

### Estrutura

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  login VARCHAR(50) UNIQUE NOT NULL,
  senha_hash VARCHAR(200) NOT NULL,
  nome VARCHAR(100) NOT NULL
);

### Inserção inicial

INSERT INTO usuarios (login, senha_hash, nome)
VALUES
('pedro', '<hash bcrypt>', 'Pedro'),
('davi', '<hash bcrypt>', 'Administrador');

## Fluxo de Login:

1. Frontend envia login e senha

2. Backend consulta MySQL

3. Senha validada com bcrypt.compare()

Se válido:

4. Sessão criada no Redis

5. Backend retorna sessionId

6.Frontend armazena sessionId

7. Requisições seguintes usam x-session-id

## Sessões com Redis:

{
  "id": "abc123",
  "nome": "Pedro",
  "login": "pedro",
  "logadoEm": "2025-11-21T00:12:00.000Z"
}

## DNS (Round-Robin):

www     IN A 10.0.0.11
www     IN A 10.0.0.12
www     IN A 10.0.0.13

## No windows, executar o bloco de notas como adm:

abrir o arquivo hosts no caminho (se não aparecer hosts, troque 'documentos de txt' por 'todos os arquivos' ):

➜ C:\Windows\System32\drivers\etc\hosts

e adicionar ao final do hosts:

10.0.0.11   www.meutrabalho.com.br
10.0.0.12   www.meutrabalho.com.br
10.0.0.13   www.meutrabalho.com.br

## Frontend (React):

api.js
export const API_URLS = [
  "http://www.meutrabalho.com.br:3001",
  "http://www.meutrabalho.com.br:3002",
  "http://www.meutrabalho.com.br:3003"
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

## Como Executar:

0. No powershell: 

ipconfig /flushdns

1. MySQL workbench (Arquivo passoApasso.txt)

Criar banco trabalho

Executar init.sql

2. Redis

Porta: 6379

3. Backends
cd backendA && npm run dev
cd backendB && npm run dev
cd backendC && npm run dev

4. Frontend
cd design
npm run dev

# Scripts:

### Abrir 3 terminais e rodar cada bloco de comando a seguir:

cd backendA
npm run dev

cd backendB
npm run dev

cd backendC
npm run dev

### em um novo terminal, na pasta design:

npm run build
npm install -g serve
serve -s dist -l 80

Vai rodar em:

1. http://localhost
          ou
2. http://www.meutrabalho.com.br

## Status Final do Projeto:

● Login funcionando

● Hash seguro

● Sessões distribuídas

● Redis ok

● MySQL ok

● DNS configurado

● Frontend com fallback

● Três servidores funcionando

## Conclusão

O projeto implementa uma aplicação distribuída completa, utilizando três servidores backend balanceados por DNS Round Robin, um frontend em React e um servidor Redis responsável pela centralização de sessões. A autenticação permanece consistente mesmo quando o cliente é redirecionado entre diferentes instâncias do backend, demonstrando na prática o problema de gerenciamento de estado em sistemas distribuídos e sua solução.