const pesagemService = require("../services/pesagens.service");

module.exports = {
  listar: async (req, res) => {
    const filtros = req.query;
    const pesagens = await pesagemService.listar(filtros);
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

  reimprimirTicket: async (req, res) => {
    const pesagem = await pesagemService.buscarPorId(req.params.id);
    if (!pesagem)
      return res.status(404).json({ mensagem: "Pesagem não encontrada" });

    // Estrutura para reimpressão
    const ticket = `
    PESAGEM Nº ${pesagem.numero}
    Cliente: ${pesagem.cliente}
    Produto: ${pesagem.produto}
    Motorista: ${pesagem.motorista}
    Placa: ${pesagem.placa}
    Peso Bruto: ${pesagem.bruto} kg
    Peso Tara: ${pesagem.tara} kg
    Peso Líquido: ${pesagem.liquido} kg
    Data: ${pesagem.data}
    Hora: ${pesagem.hora}
  `;

    res.send(`<pre>${ticket}</pre>`);
  },
};
