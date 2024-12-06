const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // Servir os arquivos estáticos (HTML, CSS, JS)

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1313885647769042954/b7MKwyN1RYCT3FtMgbBywvnuEc8JwNpeu2AW_uDD0yFGFaU8NLeJ-F1TeuQBva61aMzq";

// Rota para receber os dados do formulário
app.post("/cadastrar-item", async (req, res) => {
    const { usuarioselecionado, tipoAparelho, numeroSerie, local, destino, dataSaida, situacao, modelo } = req.body;

    // Criação da mensagem com formatação em negrito
    const message = {
        content: `**Novo Item Cadastrado**:\n\n` +
                 `**Aparelho:** ${tipoAparelho || "Não informado"}\n` +
                 `**Número de Série:** ${numeroSerie || "Não informado"}\n` +
                 `**Origem:** ${local || "Não informado"}\n` +
                 `**Destino:** ${destino || "Não informado"}\n` +
                 `**Data de Saída:** ${dataSaida || "Não informado"}\n` +
                 `**Situação:** ${situacao || "Não informado"}\n` +  // Corrigido para usar o campo "situacao"
                 `**Modelo:** ${modelo || "Não informado"}\n\n` +
                 `**Usuário:** ${usuarioselecionado || "Não informado"}\n\n` +  // Corrigido para usar o campo "usuarioselecionado"
                 `--------------------------------------\n\n`
    };

    try {
        await axios.post(DISCORD_WEBHOOK_URL, message);
        res.json({ status: "sucesso" });
    } catch (error) {
        console.error("Erro ao enviar mensagem para o Discord", error);
        res.status(500).json({ status: "erro", message: "Erro ao cadastrar o item" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
