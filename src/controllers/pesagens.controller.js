const pesagemService = require("../services/pesagens.service");

module.exports = {
  listar: async (req, res) => {
    const pesagens = await pesagemService.listar();
    res.json(pesagens);
  },

  buscarPorId: async (req, res) => {
    const pesagem = await pesagemService.buscarPorId(req.params.id);
    if (pesagem) res.json(pesagem);
    else res.status(404).json({ mensagem: "Pesagem não encontrada" });
  },

  criar: async (req, res) => {
    const novaPesagem = await pesagemService.criar(req.body);
    res.status(201).json(novaPesagem);
  },
};
