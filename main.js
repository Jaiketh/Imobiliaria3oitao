// Referência ao formulário e tabela
const form = document.querySelector("#formulariocontato");
const galeria = document.getElementById("corpoGaleria");



// READ
const lerGaleria = async () => {
    const resultado = await fetch(
        "https://avaliacao3-idw-alanpasqualetto-default-rtdb.firebaseio.com/lotes.json",
        {
            method: "GET",
        }
    );

    if (resultado.ok) {
        galeria.innerHTML = ""; // Limpar tabela
        const dados = await resultado.json();
        for (let id in dados) {
            const div = document.createElement("div");
            const lote = dados[id];
			
			// Buscar imagem para o lote
            const imgUrl = await buscarImagem();
			
            // Adicionar na galeria
            div.classList.add("gallery-item");
            div.innerHTML = `
				<p><strong>Tá Pagando o Lote?</p>
                <img src="${imgUrl}" alt="Imagem do lote">
                <p><strong>Bairro:</strong> ${lote.bairro}</p>
                <p><strong>Valor:</strong> R$ ${lote.valor.toFixed(2)}</p>
                <p><strong>Dimensões:</strong> ${lote.frente}m x ${lote.lateral}m</p>
                <p><strong>Responsável:</strong> ${lote.nome}</p>
            `;
            galeria.appendChild(div);
        }
    }
};
lerGaleria();

const buscarImagem = async () => {
    const resultado = await fetch('https://yesno.wtf/api'); // Buscar imagem aleatória
    if (resultado.ok) {
        const dados = await resultado.json(); // Converter resposta para objeto JS
        return dados.image; // Retornar a URL da imagem
    }
    return ''; // Retornar uma string vazia em caso de erro
};

