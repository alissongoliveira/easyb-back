const db = require("../config/db");

module.exports = {
  listar: async (filtros) => {
    const params = [];
    const condicoes = [];

    if (filtros.cliente) {
      params.push(`%${filtros.cliente}%`);
      condicoes.push(`cliente ILIKE $${params.length}`);
    }

    if (filtros.motorista) {
      params.push(`%${filtros.motorista}%`);
      condicoes.push(`motorista ILIKE $${params.length}`);
    }

    if (filtros.placa) {
      params.push(`%${filtros.placa}%`);
      condicoes.push(`placa ILIKE $${params.length}`);
    }

    if (filtros.numero) {
      params.push(`%${filtros.numero}%`);
      condicoes.push(`numero ILIKE $${params.length}`);
    }

    if (filtros.dataInicial) {
      params.push(filtros.dataInicial);
      condicoes.push(`data >= $${params.length}`);
    }

    if (filtros.dataFinal) {
      params.push(filtros.dataFinal);
      condicoes.push(`data <= $${params.length}`);
    }

    const where = condicoes.length ? `WHERE ${condicoes.join(" AND ")}` : "";
    const sql = `SELECT * FROM pesagens ${where} ORDER BY id DESC`;

    const result = await db.query(sql, params);
    return result.rows;
  },

  buscarPorId: async (id) => {
    const result = await db.query("SELECT * FROM pesagens WHERE id = $1", [id]);
    return result.rows[0];
  },

  criar: async (dados) => {
    const {
      numero,
      cliente,
      produto,
      motorista,
      placa,
      tara,
      liquido,
      bruto,
      observacoes,
      data,
      hora,
    } = dados;

    const result = await db.query(
      `INSERT INTO pesagens (
        numero, cliente, produto, motorista, placa,
        tara, liquido, bruto, observacoes, data, hora
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        numero,
        cliente,
        produto,
        motorista,
        placa,
        tara,
        liquido,
        bruto,
        observacoes,
        data,
        hora,
      ]
    );
    return result.rows[0];
  },
};
