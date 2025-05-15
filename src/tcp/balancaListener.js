const net = require("net");
const db = require("../config/db");

async function iniciarLeituraDasBalancas() {
  try {
    const { rows } = await db.query(
      "SELECT id, nome, ip, porta FROM balancas_config"
    );

    rows.forEach((balanca) => {
      const porta = parseInt(balanca.porta, 10);

      const server = net.createServer((socket) => {
        console.log(`📡 Conectado à ${balanca.nome} (porta ${porta})`);

        socket.on("data", (data) => {
          const mensagem = data.toString().trim();
          console.log(`Dados recebidos da ${balanca.nome}:`, data.toString());

          const peso = parsePeso(mensagem);

          if (peso !== null) {
            console.log(`Peso recebido da ${balanca.nome}: ${peso} kg`);
            // Aqui irá emitir para o front
          } else {
            console.warn(`Peso inválido da ${balanca.nome}: "${mensagem}"`);
          }
        });

        socket.on("end", () => {
          console.log(`${balanca.nome} desconectada`);
        });

        socket.on("error", (err) => {
          console.error(`Erro na ${balanca.nome}:`, err.message);
        });
      });

      server.listen(porta, () => {
        console.log(`Escutando ${balanca.nome} na porta ${porta}`);
      });
    });
  } catch (err) {
    console.error("Erro ao buscar configurações das balanças:", err);
  }
}

function parsePeso(mensagem) {
  const match = mensagem.match(/\+?0*(\d{1,7})/); // Ex: "+000012340kg"
  return match ? parseInt(match[1]) : null;
}

module.exports = iniciarLeituraDasBalancas;
