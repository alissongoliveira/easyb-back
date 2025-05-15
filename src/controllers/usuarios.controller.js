const usuarioService = require("../services/usuarios.service");

module.exports = {
  listar: async (req, res) => {
    const usuarios = await usuarioService.listar();
    res.json(usuarios);
  },

  buscarPorId: async (req, res) => {
    const usuario = await usuarioService.buscarPorId(req.params.id);
    if (usuario) res.json(usuario);
    else res.status(404).json({ mensagem: "Usuário não encontrado" });
  },

  criar: async (req, res) => {
    const novo = await usuarioService.criar(req.body);
    res.status(201).json(novo);
  },

  deletar: async (req, res) => {
    const ok = await usuarioService.deletar(req.params.id);
    if (ok) res.sendStatus(204);
    else res.status(404).json({ mensagem: "Usuário não encontrado" });
  },

  login: async (req, res) => {
    const { usuario, senha } = req.body;
    const valido = await usuarioService.verificarLogin(usuario, senha);
    if (valido) res.json({ mensagem: "Login válido" });
    else res.status(401).json({ mensagem: "Credenciais inválidas" });
  },

  atualizar: async (req, res) => {
    try {
      const atualizado = await usuarioService.atualizar(
        req.params.id,
        req.body
      );
      if (!atualizado) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
      res.json(atualizado);
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      res.status(500).json({ erro: "Erro ao atualizar usuário" });
    }
  },
};
