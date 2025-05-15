const service = require("../services/balancasConfig.service");

module.exports = {
  listar: async (req, res) => {
    const balancas = await service.listar();
    res.json(balancas);
  },

  criar: async (req, res) => {
    const nova = await service.criar(req.body);
    res.status(201).json(nova);
  },

  atualizar: async (req, res) => {
    const ok = await service.atualizar(req.params.id, req.body);
    if (ok) res.json({ mensagem: "Balança atualizada" });
    else res.status(404).json({ mensagem: "Balança não encontrada" });
  },
};
