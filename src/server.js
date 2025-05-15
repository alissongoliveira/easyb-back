require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const usuariosRoutes = require("./routes/usuarios.routes");
const pesagensRoutes = require("./routes/pesagens.routes");
const complementosRoutes = require("./routes/complementos.routes");
const balancasConfigRoutes = require("./routes/balancasConfig.routes");

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.send("API Easy Balance está rodando");
  } catch (err) {
    console.error("Erro na conexão com o banco:", err);
    res.status(500).send("Erro na conexão com o banco");
  }
});

// Rotas
app.use("/usuarios", usuariosRoutes);
app.use("/pesagens", pesagensRoutes);
app.use("/complementos", complementosRoutes);
app.use("/balancas-config", balancasConfigRoutes);

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
