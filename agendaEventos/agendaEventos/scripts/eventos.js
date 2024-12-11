const eventos = carregarEventos();

window.onload = () => {
    const link = window.location.href;
    if (link.includes("Eventos.html")) {
        const ev = document.querySelector("#eventos");
        ev.classList.add("page");
    }
};

// Cadatrando um evento e adicionando ao localStorage
document.getElementById("cadastrar").addEventListener("click", (event) => {
    event.preventDefault();

    let evento = {
        id: eventos.length > 0 ? Math.max(...eventos.map(evento => evento.id)) + 1 : 1,
        titulo: document.getElementById("title").value,
        descricao: document.getElementById("description").value,
        data: document.getElementById("date").value,
        hora: document.getElementById("time").value
    };

    eventos.push(evento);

    salvarEventos();

    if (localStorage.getItem('eventos')) {
        var modal = document.getElementById("notificationModal");
        var span = document.getElementsByClassName("close")[0];
        var h2 = document.getElementById("success");
        h2.textContent = "Sucesso";
        var p = document.getElementById("sucContent");
        p.textContent = "Evento adicionado com sucesso!";

        modal.style.display = "block";

        setTimeout(() => {
            location.reload();
            modal.style.display = "none";
        }, 3000);

        span.onclick = function () {
            location.reload();
            modal.style.display = "none";
        };

        window.onclick = function (e) {
            if (e.target == modal) {
                location.reload();
                modal.style.display = "none";
            }
        };
    } else {
        var modal = document.getElementById("notificationModal");
        var span = document.getElementsByClassName("close")[0];
        var h2 = document.getElementById("success");
        h2.textContent = "Erro";
        var p = document.getElementById("sucContent");
        p.textContent = "Ocorreu um erro e o evento não pôde ser adicionado!";

        modal.style.display = "block";

        setTimeout(() => {
            location.reload();
            modal.style.display = "none";
        }, 3000);

        span.onclick = function () {
            location.reload();
            modal.style.display = "none";
        };

        window.onclick = function (e) {
            if (e.target == modal) {
                location.reload();
                modal.style.display = "none";
            }
        };
    }
});

function carregarEventos() {
    const eventosSalvos = localStorage.getItem('eventos');
    if (eventosSalvos) {
        return JSON.parse(eventosSalvos);
    }
    return [];
}

function salvarEventos() {
    localStorage.setItem('eventos', JSON.stringify(eventos));
}