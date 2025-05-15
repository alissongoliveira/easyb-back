const db = require("../config/db");

module.exports = {
  listar: async () => {
    const result = await db.query("SELECT * FROM tablets ORDER BY id");
    return result.rows;
  },

  criar: async ({ ip, pa_carregadeira }) => {
    const result = await db.query(
      "INSERT INTO tablets (ip, pa_carregadeira) VALUES ($1, $2) RETURNING *",
      [ip, pa_carregadeira]
    );
    return result.rows[0];
  },

  atualizar: async (id, { ip, pa_carregadeira }) => {
    const result = await db.query(
      "UPDATE tablets SET ip = $1, pa_carregadeira = $2 WHERE id = $3",
      [ip, pa_carregadeira, id]
    );
    return result.rowCount > 0;
  },
};
