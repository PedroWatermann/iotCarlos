const content = document.querySelectorAll('.content');
const link = window.location.href.toString();

window.onload = () => {
    const th = document.getElementById("mesAtual2");
    th.textContent = mesAtual();

    if (link.includes("calendario")) {
        const calendar = document.querySelector("#calendario");
        calendar.classList.add("page");
    }

    adicionaOsDiasDoMes(2024, 12);

    temEvento();
};

content.forEach(content => {
    content.addEventListener('click', event => {
        content.forEach(el => el.classList.remove('expanded'));
        content.classList.add('expanded');

        event.stopPropagation();
    });
});

document.addEventListener('click', () => {
    content.forEach(content => content.classList.remove('expanded'));
});

function temEvento() {
    const containers = document.querySelectorAll('.container');

    containers.forEach(container => {
        const content = container.querySelector('.content');

        if (content.textContent.trim().length > 0) {
            container.classList.add('glow');
        } else {
            container.classList.remove('glow');
        }
    });
}

function primeiroDiaDaSemana(ano, mes) {
    const data = new Date(ano, mes - 1, 1);

    const diaSemana = data.getDay();

    return diaSemana;
}

function semanasNoMes(ano, mes) {
    const primeiroDia = new Date(ano, mes - 1, 1);
    const ultimoDia = new Date(ano, mes, 0);

    const diaSemanaInicio = primeiroDia.getDay();
    const diasNoMes = ultimoDia.getDate();

    const semanas = Math.ceil((diasNoMes + diaSemanaInicio) / 7);

    return semanas;
}

function mesAtual() {
    const data = new Date();
    const mes = data.getMonth();
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return meses[mes];
}

function adicionaOsDiasDoMes(ano, mes) {
    const week = document.getElementById("week");
    week.innerHTML = "";

    const ultimoDiaDoMes = new Date(ano, mes, 0).getDate(); // Retorna o dia (31, 30, 29, 28)
    const primeiroDiaSemana = primeiroDiaDaSemana(ano, mes); // Retorna um int (0(domingo) - 6(sábado))
    const qtdeSemanas = semanasNoMes(ano, mes); // Retorna um int (4, 5, 6)
    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    let dia = 1;

    for (let i = 0; i < qtdeSemanas; i++) {
        const tr = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const td = document.createElement("td");
            const div = document.createElement("div");
            div.className = "container";

            const p1 = document.createElement("p");
            p1.className = "day";

            const p2 = document.createElement("p");
            p2.className = "content";

            if (i === 0 && j < primeiroDiaSemana) {
                p1.textContent = "";
            } else if (dia <= ultimoDiaDoMes) {
                p1.textContent = dia;

                const eventosDoDia = eventos.filter(evento => {
                    const dataEvento = new Date(evento.data);
                    return (
                        dataEvento.getFullYear() === ano &&
                        dataEvento.getMonth() + 1 === mes &&
                        dataEvento.getDate() === dia
                    );
                });

                if (eventosDoDia.length > 0) {
                    const ul = document.createElement("ul");
                    ul.className = "ul_do_titulo";
                    eventosDoDia.forEach(evento => {
                        const li = document.createElement("li");
                        li.textContent = evento.titulo;
                        ul.appendChild(li);
                    });
                    p2.appendChild(ul);
                } else {
                    p2.textContent = "";
                }

                dia++;
            } else {
                p1.textContent = "";
                p2.textContent = "";
            }

            div.appendChild(p1);
            div.appendChild(p2);
            td.appendChild(div);
            tr.appendChild(td);
        }
        week.appendChild(tr);
    }
}