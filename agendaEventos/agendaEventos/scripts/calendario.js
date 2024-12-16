const content = document.querySelectorAll('.content');
const link = window.location.href.toString();
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");
const th = document.getElementById("mesAtual2");
const today = document.getElementById("today");

let ano = new Date().getFullYear(); // 2024
let mes = new Date().getMonth(); // 11 = dezembro
let dia = new Date().getDate(); // Retorna o dia atual


window.onload = () => {
    let filter = verificaUrlParams();

    if (filter == "day") {
        today.style.width = "60%";

        th.colSpan = 3;
        th.textContent = mesAtual(mes) + ' - ' + ano;

        adicionaDia();

        btnLeft.addEventListener("click", () => {
            if (dia == 1) {
                let oDia = new Date(ano, mes, 0).getDate();
                dia = oDia;

                if (mes == 0) {
                    mes = 11;
                    ano -= 1;
                } else {
                    mes -= 1;
                }
            } else {
                dia -= 1;
            }

            th.textContent = mesAtual(mes) + ' - ' + ano;

            adicionaDia();

            temEvento();
        });

        btnRight.addEventListener("click", () => {
            let oDia = new Date(ano, mes + 1, 0).getDate();
            if (dia == oDia) {
                dia = 1;

                if (mes == 11) {
                    ano += 1;
                    mes = 0;
                } else {
                    mes += 1;
                }
            } else {
                dia += 1;
            }

            th.textContent = mesAtual(mes) + ' - ' + ano;

            adicionaDia();

            temEvento();
        });

        today.addEventListener("click", () => {
            ano = new Date().getFullYear(); // 2024
            mes = new Date().getMonth(); // 11 = dezembro
            dia = new Date().getDate(); // Retorna o dia atual

            th.textContent = mesAtual(mes) + ' - ' + ano;

            adicionaDia();

            temEvento();
        });

        temEvento();
    } else if (filter == "week") {
        th.textContent = mesAtual(mes) + ' - ' + ano;

        const semanaAtual = new Date();
        let inicioSemana = new Date(semanaAtual.setDate(semanaAtual.getDate() - semanaAtual.getDay()));
        let fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6);

        adicionaOsDiasDaSemana(inicioSemana);

        btnLeft.addEventListener("click", () => {
            inicioSemana.setDate(inicioSemana.getDate() - 7);
            fimSemana.setDate(fimSemana.getDate() - 7);
            adicionaOsDiasDaSemana(inicioSemana);
            temEvento();
        });

        btnRight.addEventListener("click", () => {
            inicioSemana.setDate(inicioSemana.getDate() + 7);
            fimSemana.setDate(fimSemana.getDate() + 7);
            adicionaOsDiasDaSemana(inicioSemana);
            temEvento();
        });


        today.addEventListener("click", () => {
            const hoje = new Date();
            inicioSemana = new Date(hoje.setDate(hoje.getDate() - hoje.getDay()));
            fimSemana = new Date(inicioSemana);
            fimSemana.setDate(inicioSemana.getDate() + 6);
            adicionaOsDiasDaSemana(inicioSemana);
            temEvento();
        });

        temEvento();
    } else if (filter == "month") {
        th.textContent = mesAtual(mes) + ' - ' + ano;

        if (link.includes("calendario")) {
            const calendar = document.querySelector("#calendario");
            calendar.classList.add("page");
        }

        btnLeft.addEventListener("click", () => {
            ano = mes == 0 ? ano - 1 : ano;
            mes = mes == 0 ? 11 : mes - 1;
            adicionaOsDiasDoMes(ano, mes + 1);
            temEvento();
            th.textContent = mesAtual(mes) + ' - ' + ano;
        });

        btnRight.addEventListener("click", () => {
            ano = mes == 11 ? ano + 1 : ano;
            mes = mes == 11 ? 0 : mes + 1;
            adicionaOsDiasDoMes(ano, mes + 1);
            temEvento();
            th.textContent = mesAtual(mes) + ' - ' + ano;
        });

        today.addEventListener("click", () => {
            ano = new Date().getFullYear();
            mes = new Date().getMonth();
            adicionaOsDiasDoMes(ano, mes + 1);
            temEvento();
            th.textContent = mesAtual(mes) + ' - ' + ano;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        adicionaOsDiasDoMes(ano, mes + 1);
        temEvento();
    }
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

function mesAtual(mesAt) {
    const mes = mesAt;
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    return meses[mes];
}

// Função para verificar o filtro que o usuário escolheu para a visualização dos eventos
function verificaUrlParams() {
    const paramsUrl = new URLSearchParams(window.location.search);
    const filter = paramsUrl.get("filter").toString();

    if (filter === "day") {
        return "day";
    }
    if (filter === "week") {
        return "week";
    }
    if (filter === "month") {
        return "month";
    }

    return "";
}

function mesAtualTexto(mes) {
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
                        dataEvento.getDate() === dia - 1
                    );
                });

                if (eventosDoDia.length > 0) {
                    const ul = document.createElement("ul");
                    ul.className = "ul_do_titulo";
                    eventosDoDia.forEach(evento => {
                        const li = document.createElement("li");
                        const linkdop = document.createElement("a");
                        linkdop.textContent = evento.titulo;
                        linkdop.classList.add("linkdop");
                        linkdop.href = `editEventos.html?id=${evento.id}&local=cal`;
                        li.appendChild(linkdop);
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

function adicionaOsDiasDaSemana(inicioSemana) {
    const week = document.getElementById("week");
    week.innerHTML = ""; // Limpa a semana atual

    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    // Cria a linha única para a semana
    const tr = document.createElement("tr");

    for (let i = 0; i < 7; i++) {
        const diaAtual = new Date(inicioSemana);
        diaAtual.setDate(inicioSemana.getDate() + i);

        const td = document.createElement("td");
        const div = document.createElement("div");
        div.className = "container";

        const p1 = document.createElement("p");
        p1.className = "day";

        const p2 = document.createElement("p");
        p2.className = "content";

        // Sempre exibe os dias, mesmo que sejam de outro mês
        p1.textContent = diaAtual.getDate();

        const eventosDoDia = eventos.filter(evento => {
            const dataEvento = new Date(evento.data);
            return (
                dataEvento.getFullYear() === diaAtual.getFullYear() &&
                dataEvento.getMonth() === diaAtual.getMonth() &&
                dataEvento.getDate() === diaAtual.getDate()
            );
        });

        if (eventosDoDia.length > 0) {
            const ul = document.createElement("ul");
            ul.className = "ul_do_titulo";
            eventosDoDia.forEach(evento => {
                const li = document.createElement("li");
                const linkdop = document.createElement("a");
                linkdop.textContent = evento.titulo;
                linkdop.classList.add("linkdop");
                linkdop.href = `editEventos.html?id=${evento.id}&local=cal`;
                li.appendChild(linkdop);
                ul.appendChild(li);
            });
            p2.appendChild(ul);
        } else {
            p2.textContent = ""; // Texto caso não haja eventos
        }

        div.appendChild(p1);
        div.appendChild(p2);
        td.appendChild(div);

        tr.appendChild(td);
    }

    week.appendChild(tr);

    // Ajusta o título para incluir os dois meses (se necessário)
    const th = document.getElementById("mesAtual2");
    const mesInicial = inicioSemana.getMonth();
    const mesFinal = new Date(inicioSemana).setDate(inicioSemana.getDate() + 6);
    const mesFinalTexto = new Date(mesFinal).getMonth();

    if (mesInicial !== mesFinalTexto) {
        th.textContent =
            mesAtualTexto(mesInicial) +
            " / " +
            mesAtualTexto(mesFinalTexto) +
            " - " +
            inicioSemana.getFullYear();
    } else {
        th.textContent = mesAtualTexto(mesInicial) + " - " + inicioSemana.getFullYear();
    }
}

function adicionaDia() {
    const weekDays = document.getElementById("weekDays");
    weekDays.innerHTML = "";

    const th = document.createElement("th");
    const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    let dataCompleta = `${ano}-${mes + 1}-${dia}`; console.log(typeof (dataCompleta));

    th.textContent = diasDaSemana[new Date(dataCompleta).getUTCDay()];
    th.colSpan = 5;

    weekDays.appendChild(th);

    const week = document.getElementById("week");
    week.innerHTML = "";

    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    const tr = document.createElement("tr");

    const td = document.createElement("td");

    const div = document.createElement("div");
    div.className = "container";
    div.style.width = "100%";

    const p1 = document.createElement("p");
    p1.className = "day";
    p1.textContent = dia;

    const p2 = document.createElement("p");
    p2.className = "content";
    const eventosDoDia = eventos.filter(evento => {
        const dataEvento = new Date(evento.data);

        return (
            dataEvento.getFullYear() === ano &&
            dataEvento.getMonth() === mes &&
            dataEvento.getDate() === dia - 1
        );
    });
    if (eventosDoDia.length > 0) {
        const ul = document.createElement("ul");
        ul.className = "ul_do_titulo";
        eventosDoDia.forEach(evento => {
            const li = document.createElement("li");
            const linkdop = document.createElement("a");
            linkdop.textContent = evento.titulo;
            linkdop.classList.add("linkdop");
            linkdop.href = `editEventos.html?id=${evento.id}&local=cal`;
            li.appendChild(linkdop);
            ul.appendChild(li);
        });
        p2.appendChild(ul);
    } else {
        p2.textContent = "";
    }

    div.appendChild(p1);
    div.appendChild(p2);

    const divTabela = document.querySelector("#divTabela");
    divTabela.classList.add("soalteraadiv");

    td.appendChild(div);

    td.colSpan = 5;
    tr.appendChild(td);

    week.appendChild(tr);
}