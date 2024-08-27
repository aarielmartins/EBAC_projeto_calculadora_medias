const form = document.getElementById('form-atividade');
let linhas = '';
const imgAprovado = '<img src ="./images/aprovado.png" alt="Emoji celebrando"/>';
const imgReprovado = '<img src ="./images/reprovado.png" alt="Emoji decepcionado"/>';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'; // AS CLASSES "RESULTADO" E "APROVADO" FORAM CRIADAS NO CSS
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'; // AS CLASSES "RESULTADO" E "REPROVADO" FORAM CRIADAS NO CSS
const notaMinima = parseFloat(prompt('Digite e nota mínima:')); //O PROMPT INSERE UMA RESPOSTA DO USUÁRIO, QUE DEFINE QUAL SERÁ A NOTA MÍNIMA. O PROMPT É LIDO COMO STRING, ENTÃO PRECISA DO PARSEFLOAT PARA TRANSFORMAR EM VALOR

form.addEventListener('submit', function(e){
    e.preventDefault();

    adicionaLinha(); //CRIE FUNÇÕES PARA ORGANIZAR O CÓDIGO
    atualizaTabela();
    atualizaMediaFinal();

});

function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)){ //O".INCLUDES" RETORNA TRUE OR FALSE CASO A STRING OU VALOR JA EXISTA NO ARRAY
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
    } else{

    atividades.push(inputNomeAtividade.value); //ADICIONA OS NOMES DAS ATIVIDADES AO ARRAY "ATIVIDADES"
    notas.push(parseFloat(inputNotaAtividade.value)); // "PARSEFLOAT" TRANSFORMA A STRING EM NÚMERO REAL. D CONTRÁRIO SERIAM CARACTERES E NÃO NÚMEROS

    let linha = '<tr>'
    linha += `<td> ${inputNomeAtividade.value}</td>`;//"+=": CONCATENAÇÃO
    linha += `<td> ${inputNotaAtividade.value}</td>`;
    linha += `<td> ${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado} </td>`; // FAZER IF COM "OPERADOR TERNÁRIO" - "?" = IF E ":" = ELSE
    linha += '</tr>';

    linhas += linha;

    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal(){
    const mediaFinal = calcularMediaFinal();
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); // O "INNER.HTML" TROCA O HTML PELA VARIÁVEL E O "TO.FIXED(2) CRIA 2 CASAS APÓS A VÍRGULA"
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; //TROCA O HTML PELO "OPERADOR TERNÁRIO"
}

function calcularMediaFinal(){
    let somaDasNotas = 0;

    for (let i=0; i < notas.length; i++){ //"NOTAS.LENGHT" É O NÚMERO DE VALORES DENTRO DO ARRAY
        somaDasNotas += notas[i]; //"+=" É USADO PARA SOMAR O "NOTAS" + NOTA DO LAÇO
    }

    return somaDasNotas/notas.length;
}
