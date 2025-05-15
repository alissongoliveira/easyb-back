require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("API Easy Balance está rodando 🚀");
});

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
