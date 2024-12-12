const eventos = () => {
    const eventosSalvos = localStorage.getItem('eventos');
    if (eventosSalvos) {
        return JSON.parse(eventosSalvos);
    }
    return [];
};

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = Number(urlParams.get("id"));

    const titulo = document.getElementById("title");
    const descricao = document.getElementById("description");
    const data = document.getElementById("date");
    const hora = document.getElementById("time");

    const eventosSalvos = eventos();
    const evento = eventosSalvos.find(evento => evento.id === id);

    if (evento) {
        titulo.textContent = evento.titulo;
        descricao.textContent = evento.descricao;
        data.textContent = formatData(evento.data);
        hora.textContent = evento.hora;

        document.getElementById("yes").addEventListener("click", (ev) => {
            ev.preventDefault();

            const eventosAtualizados = eventosSalvos.filter(evento => evento.id !== id);
            
            localStorage.setItem('eventos', JSON.stringify(eventosAtualizados));

            mostraModal("Sucesso", "Evento excluído com sucesso!");
        });

        document.getElementById("no").addEventListener("click", () => {
            window.location.href = "index.html";
        });
    } else {
        mostraModal("Erro", "Ocorreu um erro e o evento não pôde ser encontrado!");
    }
};

function mostraModal(msg1, msg2) {
    var modal = document.getElementById("notificationModal");
    var span = document.getElementsByClassName("close")[0];

    var h2 = document.getElementById("success");
    h2.textContent = `${msg1}`;
    var p = document.getElementById("sucContent");
    p.textContent = `${msg2}`;

    modal.style.display = "block";

    setTimeout(() => {
        window.location.href = "index.html";        
    }, 3000);

    span.onclick = function () {
        window.location.href = "index.html";
    };

    window.onclick = function (e) {
        if (e.target == modal) {
            window.location.href = "index.html";
        }
    };
}

function formatData( dt ) {
    const data = dt.split("-");
    const dia = data[2];
    const mes = data[1];
    const ano = data[0];
    return dataFormatada = `${dia}/${mes}/${ano}`;
}