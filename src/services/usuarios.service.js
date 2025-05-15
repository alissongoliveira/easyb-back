const db = require("../config/db");
const bcrypt = require("bcrypt");

module.exports = {
  // Listar Usuários
  listar: async (filtros = {}) => {
    const condicoes = [];
    const params = [];

    if (filtros.dataInicial) {
      params.push(filtros.dataInicial);
      condicoes.push(`criado_em >= $${params.length}`);
    }

    if (filtros.dataFinal) {
      params.push(filtros.dataFinal);
      condicoes.push(`criado_em <= $${params.length}`);
    }

    const where = condicoes.length ? `WHERE ${condicoes.join(" AND ")}` : "";

    const result = await db.query(
      `SELECT id, nome, usuario, criado_em, privilegios FROM usuarios ${where} ORDER BY criado_em DESC`,
      params
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

  // Atualizar Usuário
  atualizar: async (id, dados) => {
    const campos = [];
    const valores = [];
    let index = 1;

    if (dados.nome) {
      campos.push(`nome = $${index++}`);
      valores.push(dados.nome);
    }

    if (dados.usuario) {
      campos.push(`usuario = $${index++}`);
      valores.push(dados.usuario);
    }

    if (dados.senha) {
      const hash = await bcrypt.hash(dados.senha, 10);
      campos.push(`senha = $${index++}`);
      valores.push(hash);
    }

    if (dados.privilegios) {
      campos.push(`privilegios = $${index++}`);
      valores.push(dados.privilegios);
    }

    if (campos.length === 0) return null;

    valores.push(id);
    const query = `
      UPDATE usuarios
      SET ${campos.join(", ")}
      WHERE id = $${index}
      RETURNING id, nome, usuario, criado_em, privilegios
    `;

    const result = await db.query(query, valores);
    return result.rows[0] || null;
  },
};
