const eventList = document.getElementById('event-list');

window.onload = () => {
    console.log("carregado");

    const add = document.createElement("button");
    add.textContent = "Adicionar evento";
    add.className = "btn";
    add.classList.add("add");
    add.onclick = () => {
        window.location.href = "addEventos.html";
    };
    const elemento = document.querySelector("#conteudo");
    if (!eventList.contains(elemento)) {
        eventList.appendChild(add);
        console.log("deu certo s");

    } else {
        eventList.removeChild(add);
        console.log("deu certo n");

    }

    const linkDaPagina = location.href;
    if (linkDaPagina.includes("index")) {
        const index = document.querySelector("#index");
        index.classList.add("page");
    }
};

// Obtém os dados do localStorage
const eventos = JSON.parse(localStorage.getItem("eventos"));

if (eventos) {
    eventos.sort((a, b) => new Date(a.data) - new Date(b.data));

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

        div.appendChild(del);
        div.appendChild(edit);

        li.appendChild(a);
        li.appendChild(del);
        li.appendChild(edit);
        li.id = "conteudo";

        eventList.appendChild(li);
    });
}

function formatData(dt) {
    const data = dt.split("-");
    const dia = data[2];
    const mes = data[1];
    const ano = data[0];
    return dataFormatada = `${dia}/${mes}/${ano}`;
}