const service = require("../services/complementos.service");

module.exports = {
  listar: async (req, res) => {
    const status = req.query.status || "Pendente";
    const lista = await service.listar(status);
    res.json(lista);
  },

  criar: async (req, res) => {
    const novo = await service.criar(req.body);
    res.status(201).json(novo);
  },

  aceitar: async (req, res) => {
    const sucesso = await service.atualizarStatus(req.params.id, "Finalizada");
    if (sucesso) res.json({ mensagem: "Solicitação aceita" });
    else res.status(404).json({ mensagem: "Solicitação não encontrada" });
  },

  rejeitar: async (req, res) => {
    const sucesso = await service.atualizarStatus(req.params.id, "Rejeitada");
    if (sucesso) res.json({ mensagem: "Solicitação rejeitada" });
    else res.status(404).json({ mensagem: "Solicitação não encontrada" });
  },

  finalizar: async (req, res) => {
    const sucesso = await service.finalizar(req.params.id, req.body);
    if (sucesso) res.json({ mensagem: "Complemento finalizado" });
    else
      res.status(404).json({
        mensagem: "Solicitação não encontrada ou falha na finalização",
      });
  },
};
