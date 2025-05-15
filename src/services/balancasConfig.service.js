const db = require("../config/db");

module.exports = {
  listar: async () => {
    const result = await db.query("SELECT * FROM balancas_config ORDER BY id");
    return result.rows;
  },

  criar: async ({ nome, ip, porta }) => {
    const result = await db.query(
      "INSERT INTO balancas_config (nome, ip, porta) VALUES ($1, $2, $3) RETURNING *",
      [nome, ip, porta]
    );
    return result.rows[0];
  },

  atualizar: async (id, { nome, ip, porta }) => {
    const result = await db.query(
      "UPDATE balancas_config SET nome = $1, ip = $2, porta = $3 WHERE id = $4",
      [nome, ip, porta, id]
    );
    return result.rowCount > 0;
  },
};
