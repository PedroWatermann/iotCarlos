const content = document.querySelectorAll('.content');
const containers = document.querySelectorAll('.container');
const link = window.location.href.toString();

window.onload = () => {
    containers.forEach(container => {
        const content = container.querySelector('.content');

        if (content.textContent.trim().length > 0) {
            container.classList.add('glow');
        } else {
            container.classList.remove('glow');
        }
    });

    if (link.includes("calendario")) {
        const calendar = document.querySelector("#calendario");
        calendar.classList.add("page");
    }    

    const data = new Date();
    const mes = data.getMonth();
    const mesAtual = document.getElementById("mesAtual");
    const th = document.createElement("th");
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    th.textContent = meses[mes];
    th.colSpan = 7;
    th.className = "mesAtual2";

    mesAtual.appendChild(th);
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