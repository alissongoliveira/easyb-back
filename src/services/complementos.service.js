const db = require("../config/db");

module.exports = {
  listar: async (filtros = {}) => {
    const condicoes = [];
    const params = [];

    if (filtros.dataInicial) {
      params.push(`${filtros.dataInicial} 00:00:00`);
      condicoes.push(`data >= $${params.length}`);
    }

    if (filtros.dataFinal) {
      params.push(`${filtros.dataFinal} 23:59:59`);
      condicoes.push(`data <= $${params.length}`);
    }

    const where = condicoes.length ? `WHERE ${condicoes.join(" AND ")}` : "";

    const query = `SELECT * FROM complementos ${where} ORDER BY id DESC`;

    const result = await db.query(query, params);
    return result.rows;
  },

  criar: async (dados) => {
    const {
      placa,
      balanca,
      solicitante,
      operador,
      tara,
      liquido,
      bruto_antes,
      bruto_depois,
    } = dados;

    const result = await db.query(
      `INSERT INTO complementos (
        placa, balanca, solicitante, operador, status,
        tara, liquido, bruto_antes, bruto_depois,
        data, hora_solicitacao
      ) VALUES (
        $1, $2, $3, $4, 'Pendente',
        $5, $6, $7, $8,
        CURRENT_DATE, CURRENT_TIME
      ) RETURNING *`,
      [
        placa,
        balanca,
        solicitante,
        operador,
        tara,
        liquido,
        bruto_antes,
        bruto_depois,
      ]
    );
    return result.rows[0];
  },

  atualizarStatus: async (id, status) => {
    const result = await db.query(
      "UPDATE complementos SET status = $1 WHERE id = $2",
      [status, id]
    );
    return result.rowCount > 0;
  },

  finalizar: async (id, dados) => {
    const { bruto_depois, tara, liquido, operador } = dados;

    const result = await db.query(
      `UPDATE complementos SET
      status = 'Finalizada',
      bruto_depois = $1,
      tara = $2,
      liquido = $3,
      operador = $4,
      hora_finalizacao = CURRENT_TIME
    WHERE id = $5`,
      [bruto_depois, tara, liquido, operador, id]
    );

    return result.rowCount > 0;
  },
};
