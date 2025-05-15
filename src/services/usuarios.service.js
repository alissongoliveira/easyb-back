const db = require("../config/db");
const bcrypt = require("bcrypt");

module.exports = {
  // Listar Usuários
  listar: async () => {
    const result = await db.query(
      "SELECT id, nome, usuario, criado_em, privilegios FROM usuarios"
    );
    return result.rows;
  },

  // Buscar Usuário por ID
  buscarPorId: async (id) => {
    const result = await db.query(
      "SELECT id, nome, usuario, criado_em, privilegios FROM usuarios WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  //Criar Usuário
  criar: async (dados) => {
    const hash = await bcrypt.hash(dados.senha, 10);
    const result = await db.query(
      "INSERT INTO usuarios (nome, usuario, senha, privilegios, criado_em) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, nome, usuario, criado_em",
      [dados.nome, dados.usuario, hash, dados.privilegios || []]
    );
    return result.rows[0];
  },

  //Deletar Usuários
  deletar: async (id) => {
    const result = await db.query("DELETE FROM usuarios WHERE id = $1", [id]);
    return result.rowCount > 0;
  },

  // Verifica Login
  verificarLogin: async (usuario, senha) => {
    const result = await db.query(
      "SELECT senha FROM usuarios WHERE usuario = $1",
      [usuario]
    );
    if (result.rowCount === 0) return false;
    return await bcrypt.compare(senha, result.rows[0].senha);
  },
};
