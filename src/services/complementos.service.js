const db = require("../config/db");

module.exports = {
  listar: async (status = "Pendente") => {
    const result = await db.query(
      "SELECT * FROM complementos WHERE status = $1 ORDER BY id DESC",
      [status]
    );
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
    const { bruto_depois, tara, liquido } = dados;

    const result = await db.query(
      `UPDATE complementos SET
        status = 'Finalizada',
        bruto_depois = $1,
        tara = $2,
        liquido = $3,
        hora_finalizacao = CURRENT_TIME
      WHERE id = $4`,
      [bruto_depois, tara, liquido, id]
    );

    return result.rowCount > 0;
  },
};
