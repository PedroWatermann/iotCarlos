window.onload = () => {
    const linkDaPagina = location.href;
    if (linkDaPagina.includes("index")) {
        const index = document.querySelector("#index");
        index.classList.add("page");
    }
};

// Obtém os dados do localStorage
const eventos = JSON.parse(localStorage.getItem("eventos"));

eventos.sort((a, b) => new Date(a.data) - new Date(b.data));

const eventList = document.getElementById('event-list');

eventos.forEach(evento => {
    const li = document.createElement('li');
    const a = document.createElement("a");
    const div = document.createElement("div");
    const del = document.createElement("button");
    const edit = document.createElement("button");

    let data = formatData(evento.data);

    a.className = "centered";
    a.href = `editEventos.html?id=${evento.id}`;
    a.innerHTML = `<strong><em>${evento.titulo}</em></strong><br><br>${data} <br> ${evento.hora}`;

    div.className = "aligned";

    del.textContent = "Excluir";
    del.className = "btn";
    del.classList.add("red");
    del.onclick = () => {
        window.location.href = `delEventos.html?id=${evento.id}`;
    };

    edit.textContent = "Editar";
    edit.className = "btn";
    edit.classList.add("orange");
    edit.onclick = () => {
        window.location.href = `editEventos.html?id=${evento.id}`;
    };

    li.appendChild(a);
    li.appendChild(del);
    li.appendChild(edit);
    
    eventList.appendChild(li);
});

function formatData( dt ) {
    const data = new Date(dt); // Exemplo de data

    // Extrair o dia, mês e ano
    const dia = String(data.getDate()).padStart(2, '0'); // Adiciona o zero à esquerda, se necessário
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0 para janeiro, então somamos 1
    const ano = data.getFullYear(); // Pega o ano completo
    
    const dataFormatada = `${dia}/${mes}/${ano}`;
    
    return dataFormatada;
}