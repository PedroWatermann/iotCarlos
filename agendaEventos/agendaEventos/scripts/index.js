const eventos = [
    { id: '1', data: '2024-05-01', titulo: 'Evento 1' },
    { id: '2', data: '2024-04-15', titulo: 'Evento 2' },
    { id: '3', data: '2024-03-20', titulo: 'Evento 3' }
];

eventos.sort((a, b) => new Date(a.data) - new Date(b.data));

const eventList = document.getElementById('event-list');

eventos.forEach(evento => {
    const li = document.createElement('li');
    const a = document.createElement("a");
    const div = document.createElement("div");
    const del = document.createElement("button");
    const edit = document.createElement("button");

    a.className = "centered";
    a.href = `editEventos.php?id=${evento.id}`;
    a.textContent = `${evento.data} ${evento.titulo}`;

    div.className = "aligned";

    del.textContent = "Excluir";
    del.className = "btn";
    del.classList.add("red");
    del.onclick = () => {
        window.location.href = `delEventos.php?id=${evento.id}`;
    };

    edit.textContent = "Editar";
    edit.className = "btn";
    edit.classList.add("orange");
    edit.onclick = () => {
        window.location.href = `editEventos.php?id=${evento.id}`;
    };

    li.appendChild(a);

    li.appendChild(del);
    li.appendChild(edit);
    eventList.appendChild(li);
});

window.onload = () => {
    const linkDaPagina = window.location.href;
    if (linkDaPagina.includes("index.html")) {
        const index = document.querySelector("#index");
        index.classList.add("page");
    }
};

document.addEventListener("click", () => {

})