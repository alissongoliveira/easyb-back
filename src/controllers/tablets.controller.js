const service = require("../services/tablets.service");

module.exports = {
  listar: async (req, res) => {
    const tablets = await service.listar();
    res.json(tablets);
  },

  criar: async (req, res) => {
    const novo = await service.criar(req.body);
    res.status(201).json(novo);
  },

  atualizar: async (req, res) => {
    const ok = await service.atualizar(req.params.id, req.body);
    if (ok) res.json({ mensagem: "Tablet atualizado" });
    else res.status(404).json({ mensagem: "Tablet não encontrado" });
  },
};
