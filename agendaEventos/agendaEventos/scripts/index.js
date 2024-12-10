// Exemplo de array de eventos
const eventos = [
    { data: '2024-05-01', titulo: 'Evento 1' , id: '1' },
    { data: '2024-04-15', titulo: 'Evento 2' , id: '2' },
    { data: '2024-03-20', titulo: 'Evento 3' , id: '3' },
];

// Ordenar eventos por data
eventos.sort((a, b) => new Date(a.data) - new Date(b.data));

// Selecionar a lista de eventos
const eventList = document.getElementById('event-list');

// Adicionar eventos à lista
eventos.forEach(evento => {
    const li = document.createElement('li');
    const a = document.createElement("a");
    const p = document.createElement("p");
    const div = document.createElement("div");
    const del = document.createElement("button");
    const edit = document.createElement("button");

    a.className = "centered";
    a.href = `eventos.html?id=${evento.id}`;
    a.textContent = `${evento.data} ${evento.titulo}`;

    div.className = "aligned";

    del.textContent = "Excluir";
    del.className = "btn";
    del.classList.add("red");

    edit.textContent = "Editar";
    edit.className = "btn";
    edit.classList.add("orange");

    li.appendChild(a);

    li.appendChild(del);
    li.appendChild(edit);
    eventList.appendChild(li);
});

// Obtém o link da página atual
const linkDaPagina = window.location.href;
window.onload = () => {
    if (linkDaPagina.includes("index.html")) {
        const index = document.querySelector("#index");
        index.classList.add("page");
    }
};