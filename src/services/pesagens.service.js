const db = require("../config/db");

module.exports = {
  listar: async () => {
    const result = await db.query("SELECT * FROM pesagens ORDER BY id DESC");
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
