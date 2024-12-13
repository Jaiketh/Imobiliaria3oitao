// Referência ao formulário e tabela
const form = document.querySelector("#formulario");
const corpoTabela = document.querySelector("#corpoTabela");
const lerTabela = document.querySelector("#lerTabela");
const telefone = document.querySelector("#telefone");
const cpf = document.querySelector("#cpf");
const alerta = document.querySelector("#alerta");

// CREATE
form.addEventListener("submit", async (event) => {
    event.preventDefault();
	if (!validarTelefone()){
        return false;
    }
	if (!validarCPF()){
        return false;
    }
    // Obter dados do formulário
    const lote = {
        nome: form.nome.value,
        telefone: form.telefone.value,
        cpf: form.cpf.value,
        bairro: form.bairro.value,
        valor: parseFloat(form.valor.value),
        frente: parseFloat(form.frente.value),
        lateral: parseFloat(form.lateral.value),
    };

    // Enviar dados ao Firebase
    const resultado = await fetch(
        "https://avaliacao3-idw-alanpasqualetto-default-rtdb.firebaseio.com/lotes.json",
        {
            method: "POST",
            body: JSON.stringify(lote),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (resultado.ok) {
        form.reset();
        lerDados();
    }
});

// READ
const lerDados = async () => {
    const resultado = await fetch(
        "https://avaliacao3-idw-alanpasqualetto-default-rtdb.firebaseio.com/lotes.json",
        {
            method: "GET",
        }
    );

    if (resultado.ok) {
        corpoTabela.innerHTML = ""; // Limpar tabela
        const dados = await resultado.json();
        for (let id in dados) {
            const tr = document.createElement("tr");
            const lote = dados[id];

            tr.innerHTML = `
                <td>${id}</td>
                <td>${lote.nome}</td>
                <td>${lote.telefone}</td>
                <td>${lote.cpf}</td>
                <td>${lote.bairro}</td>
                <td>${lote.valor.toFixed(2)}</td>
                <td>${lote.frente}</td>
                <td>${lote.lateral}</td>
                <td>
                    <button class="btn-Editar" onclick="editar('${id}')">Editar</button>
                    <button class="btn-excluir" onclick="remover('${id}')">Excluir</button>
                </td>
            `;
			
			
            corpoTabela.appendChild(tr);
        }
    }
};
lerDados();

// Função para carregar os dados da tabela
const lerDadosTabela = async () => {
    const lerTabela = document.getElementById('lerTabela');
    const resultado = await fetch("https://avaliacao3-idw-alanpasqualetto-default-rtdb.firebaseio.com/lotes.json", {
        method: "GET",
    });

    if (resultado.ok) {
        lerTabela.innerHTML = ""; // Limpar tabela antes de inserir os dados
        const dados = await resultado.json();
        for (let id in dados) {
            const tr = document.createElement("tr");
            const lote = dados[id];
            tr.innerHTML = `
                <td>${id}</td>
                <td>${lote.nome}</td>
                <td>${lote.telefone}</td>
                <td>${lote.cpf}</td>
                <td>${lote.bairro}</td>
                <td>${lote.valor.toFixed(2)}</td>
                <td>${lote.frente}</td>
                <td>${lote.lateral}</td>
            `;
            lerTabela.appendChild(tr);
        }
    }
};
lerDadosTabela();

// UPDATE
const editar = async (id) => {
    const lote = {};
    lote.nome = prompt("Novo nome", "");
    lote.telefone = prompt("Novo telefone", "");
    lote.cpf = prompt("Novo CPF", "");
    lote.bairro = prompt("Novo bairro", "");
    lote.valor = parseFloat(prompt("Novo valor", ""));
    lote.frente = parseFloat(prompt("Nova frente", ""));
    lote.lateral = parseFloat(prompt("Nova lateral", ""));

    const resultado = await fetch(
        `https://avaliacao3-idw-alanpasqualetto-default-rtdb.firebaseio.com/lotes/${id}.json`,
        {
            method: "PUT",
            body: JSON.stringify(lote),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (resultado.ok) {
        lerDados();
    }
};

// DELETE
const remover = async (id) => {
    const resultado = await fetch(
        `https://avaliacao3-idw-alanpasqualetto-default-rtdb.firebaseio.com/lotes/${id}.json`,
        {
            method: "DELETE",
        }
    );

    if (resultado.ok) {
        lerDados();
    }
};


function validarTelefone() {
    // Fazer o regex
    const regex = /\([0-9]{2}\)9[0-9]{4}-[0-9]{4}$/;
    // Testar o regex e mostrar a mensagem de erro
    if (!regex.test(telefone.value)) {
        alerta.innerHTML = "Número de telefone inválido Ex:(**)9****-****";
        return false;
    }
    // Limpar mensagem de erro
    alerta.innerHTML = "";
    return true;
}

function validarCPF() {
    // Fazer o regex
    const regex = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/;
    // Testar o regex e mostrar a mensagem de erro
    if (!regex.test(cpf.value)) {
        alerta.innerHTML = "Número de CPF inválido Ex: ***.***.***.**";
        return false;
    }
    // Limpar mensagem de erro
    alerta.innerHTML = "";
    return true;
}


