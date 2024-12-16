// Carrega os eventos
const eventos = () => {
    const eventosSalvos = localStorage.getItem('eventos');
    if (eventosSalvos) {
        return JSON.parse(eventosSalvos);
    }
    return [];
};

window.onload = () => {
    const link = window.location.href;
    if (link.includes("Eventos.html")) {
        const ev = document.querySelector("#eventos");
        ev.classList.add("page");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get("id"));
    const titulo = document.getElementById("title");
    const descricao = document.getElementById("description");
    const data = document.getElementById("date");
    const hora = document.getElementById("time");
    const lemb = document.getElementById("lembrete");

    const eventosSalvos = eventos();
    const evento = eventosSalvos.find(evento => evento.id === id);

    if (evento) {
        titulo.value = evento.titulo;
        descricao.value = evento.descricao;
        data.value = evento.data;
        hora.value = evento.hora;
        if (evento.lembrete) {
            lemb.checked = true;
        }

        document.getElementById("edit").addEventListener("click", (ev) => {
            ev.preventDefault();

            evento.titulo = titulo.value;
            evento.descricao = descricao.value;
            evento.data = data.value;
            evento.hora = hora.value;
            if (lemb.checked) {
                evento.lembrete = true;
            } else {
                evento.lembrete = false;
            }
        
            localStorage.setItem("eventos", JSON.stringify(eventosSalvos));
        
            if (localStorage.getItem('eventos')) {
                mostraModal("Sucesso", "Evento atualizado com sucesso!");
            }
        });
    } else {
        mostraModal("Erro", "Ocorreu um erro e o evento não pôde ser encontrado!");
    }
};

function mostraModal(msg1, msg2) {
    const urlParams = new URLSearchParams(window.location.search);
    const local = urlParams.get("local");

    var modal = document.getElementById("notificationModal");
    var span = document.getElementsByClassName("close")[0];

    var h2 = document.getElementById("success");
    h2.textContent = `${msg1}`;
    var p = document.getElementById("sucContent");
    p.textContent = `${msg2}`;

    modal.style.display = "block";

    setTimeout(() => {
        if (local) {
            history.go(-1);
        } else {
            window.location.href = "index.html";        
        }
    }, 3000);

    span.onclick = function () {
        if (local) {
            history.go(-1);
        } else {
            window.location.href = "index.html";        
        }
    };

    window.onclick = function (e) {
        if (e.target == modal) {
            if (local) {
                history.go(-1);
            } else {
                window.location.href = "index.html";        
            }
        }
    };
}