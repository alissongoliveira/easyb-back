# 🧠 Easy Balance – Backend

Sistema de gestão de pesagens e complementos de carga rodoviária. Este é o back-end da aplicação **Easy Balance**, desenvolvido em **Node.js** com **Express** e **PostgreSQL**.

---

## 🚀 Funcionalidades

- Autenticação de usuários com login e hash de senha
- Cadastro e listagem de pesagens
- Solicitação, aceitação, rejeição e finalização de complementos
- Configuração de balanças (IP e porta)
- Gerenciamento de tablets e carregadeiras
- Filtros por cliente, motorista, placa, número e datas

---

## 📦 Tecnologias

- Node.js + Express
- PostgreSQL
- Bcrypt (criptografia de senhas)
- Dotenv (variáveis de ambiente)
- Cors, Nodemon

---

## 📁 Estrutura de Pastas

src/
├── config/ # Conexão com o banco (db.js)
├── controllers/ # Lógica de entrada das rotas
├── routes/ # Endpoints da API
├── services/ # Lógica de negócio
├── middlewares/ # (Futuros middlewares de auth, log, etc)
└── server.js # Arquivo principal

---

## ⚙️ Configuração

### 🔧 `.env` (exemplo)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=easybalance
PORT=3000

```

## 🧪 Scripts

# Instalar dependências

npm install

# Rodar servidor com nodemon

npm run dev

## 📜 Licença

Este projeto é de uso fechado (privado). Para uso comercial, entre em contato.
