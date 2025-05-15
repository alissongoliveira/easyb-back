const net = require("net");
const db = require("../config/db");

async function iniciarLeituraDasBalancas(io) {
  try {
    const { rows } = await db.query(
      "SELECT id, nome, ip, porta FROM balancas_config"
    );

    if (rows.length === 0) {
      console.warn("Nenhuma balança configurada no banco.");
      return;
    }

    rows.forEach((balanca) => {
      const porta = parseInt(balanca.porta, 10);

      const socket = net.createConnection(
        { host: balanca.ip, port: porta },
        () => {
          console.log(`Conectado à ${balanca.nome} em ${balanca.ip}:${porta}`);
        }
      );

      socket.on("data", (data) => {
        const mensagem = data.toString().trim();
        const peso = parsePeso(mensagem);

        console.log(`Dado bruto recebido da ${balanca.nome}: "${mensagem}"`);

        if (peso !== null) {
          io.emit("peso-balanca", {
            balanca: balanca.nome,
            peso,
          });

          console.log(`
╔═══════════════════════════════════════╗
║ ⚖️  ${balanca.nome.padEnd(20)}            ║
║ Peso recebido: ${peso.toString().padStart(6)} kg           ║
╚═══════════════════════════════════════╝
`);
        } else {
          console.warn(`Peso inválido da ${balanca.nome}: "${mensagem}"`);
        }
      });

      socket.on("end", () => {
        console.warn(`${balanca.nome} desconectou`);
      });

      socket.on("error", (err) => {
        console.error(
          `Erro na ${balanca.nome} (${balanca.ip}:${porta}):`,
          err.message
        );
      });
    });
  } catch (err) {
    console.error("Erro ao buscar configurações das balanças:", err);
  }
}

function parsePeso(mensagem) {
  const match = mensagem.match(/\+?0*(\d{1,7})/);
  return match ? parseInt(match[1]) : null;
}

module.exports = iniciarLeituraDasBalancas;
