const form = document.querySelector("#formulario");

form.addEventListener('submit', (e) => {
    // Muda o comportamento padrão do formulário
    e.preventDefault();

    // Pegando o peso e a altura e convertendo para um número
    const peso = Number(e.target.querySelector("#peso").value);
    const altura = Number(e.target.querySelector("#altura").value);

    let imc = calculaImc(peso, altura);
    let classificacao = tabelaImc(imc);
    mostraResultado(classificacao);
});

function calculaImc(peso, altura) {
    let Imc = peso / (altura ** 2);
    let imc = Imc.toFixed(2);
    return imc;
}

function tabelaImc(imc) {
    const classificacao = [
        `${imc} | Abaixo do peso!`, 
        `${imc} | Peso ideal!`, 
        `${imc} | Levemente acima do peso!`, 
        `${imc} | Obesidade grau I!`, 
        `${imc} | Obesidade grau II (severa)!`, 
        `${imc} | Obesidade grau III (mórbida)!`
    ];
    const img = document.querySelector('#imagem'); 
    img.width = 300; 
    img.height = 300;

    if (imc > 39.9) { 
        img.src = 'images/gordo3.png';
        return classificacao[5];
    }
    if (imc > 34.9) { 
        img.src = 'images/gordo2.png';
        return classificacao[4];
    }
    if (imc > 29.9) {
        img.src = 'images/gordo1.png'; 
        return classificacao[3];
    }
    if (imc > 24.9) {
        img.src = 'images/gordinho.png'; 
        return classificacao[2];
    }
    if (imc > 18.5) {
        img.src = 'images/normal.png'; 
        return classificacao[1];
    }
    if (imc <= 18.5) {
        img.src = 'images/magro.png'; 
        return classificacao[0];
    }
}

function mostraResultado(msg) {
    const resultado = document.querySelector("#resultado");
    resultado.innerHTML = msg;
}