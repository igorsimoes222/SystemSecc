// Função para atualizar o relógio e mudar sua cor
function atualizarRelogio() {
    const relogio = document.getElementById("relogio");
    const agora = new Date();

    // Formata o horário (HH:mm:ss)
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");
    relogio.textContent = `${horas}:${minutos}:${segundos}`;

    // Gera uma cor aleatória
    const corAleatoria = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    relogio.style.color = corAleatoria;
}

// Atualiza o relógio a cada segundo
setInterval(atualizarRelogio, 1000);

// Chamada inicial para exibir o relógio imediatamente
atualizarRelogio();

// Variável para armazenar o usuário selecionado
let selectedUser = "";

// Função de seleção do usuário
function selectUser(userName) {
    // Atualiza visualmente os usuários
    document.querySelectorAll(".user").forEach(user => user.classList.remove("selected"));

    // Marca o usuário selecionado
    const userElement = document.getElementById(userName.toLowerCase());
    if (userElement) {
        userElement.classList.add("selected");
    }

    // Atualiza o campo oculto com o nome do usuário
    selectedUser = userName;
    document.getElementById("usuario-selecionado").value = userName; // Agora o ID é 'usuario-selecionado'
    console.log(`Usuário selecionado: ${selectedUser}`);
}

// Adiciona eventos de clique para os usuários
document.getElementById("user1").addEventListener("click", () => selectUser("Igor"));
document.getElementById("user2").addEventListener("click", () => selectUser("Jansen"));

// Função de envio de dados
document.getElementById("form-item").addEventListener("submit", function (e) {
    e.preventDefault();

    // Verifica se um usuário foi selecionado
    if (!selectedUser) {
        alert("Por favor, selecione um usuário antes de enviar o formulário.");
        return;
    }

    // Exibe a tela de carregamento
    const loadingOverlay = document.getElementById("loading");
    loadingOverlay.style.display = "flex";

    // Captura os valores do formulário
    const tipoAparelho = document.getElementById("tipo-aparelho").value;
    const numeroSerie = document.getElementById("numero-serie").value;
    const local = document.getElementById("local").value;
    const destino = document.getElementById("destino").value;
    const dataSaida = document.getElementById("data-saida").value;
    const situacao = document.getElementById("situacao").value;  // Certifique-se de usar o ID correto
    const modelo = document.getElementById("modelo").value;
// Captura os valores do formulário

    // Verifica se o campo situação foi preenchido
    if (!situacao) {
        alert("Por favor, selecione a situação.");
        loadingOverlay.style.display = "none";
        return;
    }

    // Cria os dados a serem enviados
    const formData = {
        usuarioselecionado: selectedUser,
        tipoAparelho,
        numeroSerie,
        local,
        destino,
        dataSaida,
        situacao,
        modelo,
    };

    // Faz a requisição para o backend (exemplo com fetch)
    fetch('https://endearing-kheer-72638b.netlify.app/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item: "exemplo"
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Sucesso:", data);

            // Reseta o formulário e exibe a mensagem de sucesso
            document.getElementById("form-item").reset();
            document.getElementById("usuario-selecionado").value = "";
            selectedUser = "";

            const successMessage = document.getElementById("success-message");
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 3000);

            // Esconde a tela de carregamento
            loadingOverlay.style.display = "none";
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Houve um erro ao cadastrar o item.");
            loadingOverlay.style.display = "none";
        });
});
