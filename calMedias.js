const form = document.getElementById('formulario');

const imgAprovado = '<img src = " ./images/aprovado.png" alt=" Emoji feliz." />';  //fazer as constantes para os emojis
const imgReprovado = '<img src = " ./images/reprovado.png" alt=" Emoji triste." />';

const atividades = []; //array para armazenar as informacoes 
const notas = [];

const spanAprov = '<span class= "resultado aprovado"> Aprovado </span>'   //pegando as conf do css por aqui, para criar essa const e jogar no resultado
const spanReprov = '<span class= "resultado reprovado"> Reprovado </span>'

const notaMinima = parseFloat(prompt ('Digite a nota minima:')); //aq vamos parametrizar a nota minima. prompt = entrada do usuario
//como a entrada do usuario vai vir pra gente como uma string, a gente usa a parseFloat. Depois vamos substituir a const notaMinima onde tiver o 7 no codigo.


let linhas = '';  //criada para ir acumulandos as linhas q serao criadas conforme novas atividades e notas submetidas

form.addEventListener('submit',function(e) {  
    e.preventDefault();
    addLinha();              //quando o formulario é enviado, a funcao addlinha é chamada.
    atualizarTabela();
    atualizarMediaFinal();    //chamando todas as funcoes quando ouver o submit!
});

function addLinha() {
    const nome = document.getElementById('nome-atividade');
    const nota = document.getElementById('nota-atividade');

    const nomeA = nome.value; //por ser texto nao precisa
    const notaA = parseFloat(nota.value);  //parseFloat pq pode ser um numero quebrado. uma nota tipo 7.5

    //vamos add esse if para acabar com o bug de poder add mesmos tipos de atividade no nosso formulario.

    if (atividades.includes(nomeA)) {
        alert (`A atividade ${nomeA} já foi inserida`);
    } else {
        atividades.push(nomeA);  //puxando as info submetidas para as arrays 
        notas.push(notaA);   
        
        let linha = '<tr>';  //inicio de uma nova linha na tabela!

        linha += `<td> ${nomeA} </td>`;  //add o NOME da ativ dentro de uma celula da tabela 
        // concatenacao=> linha = linha + 'outro conteudo'
        
        linha += `<td> ${notaA} </td>`;  //add a NOTA da ativ dentro de uma celula da tabela
        
        linha += `<td> ${notaA >= notaMinima ? imgAprovado : imgReprovado } </td>`;
        // apagou o aprovado e o reprovado e substituiu pela const dos emojis, e tirou da forma de string => linha += `<td> ${notaA >= 7 ? 'Aprovado' : 'Reprovado' } </td>`;  //se >= 7 aprovado, senao, reprovado!
        
        linha += '</tr>';  //finaliza a linha da tabela

        linhas += linha ;  //acumula a linha a variavel linhas!
    }


        nome.value = '';  // Limpar o campo de entrada do nome
        nota.value = '';  // Limpar o campo de entrada da nota
        // nao rodou com nomeA = '', pois precisa pegar o campo antes de que foi add o conteudo. tipo 'cru'

}

function atualizarTabela() {
    const corpotabela = document.querySelector('tbody');
    corpotabela.innerHTML = linhas;  //pega a string linhas que esta com todoas as linhas add, e add no corpo da tabela!
}

function atualizarMediaFinal () {
    const mediaFinal = calculaMediaFinal ();
    
    document.getElementById('mediaFinalValor').innerHTML = mediaFinal.toFixed(2); //toFixed para limitar as casas decimais da media das notas.
    document.getElementById('mediaFinalResultado').innerHTML = mediaFinal >= notaMinima ? spanAprov : spanReprov;
}

function calculaMediaFinal () {
    let somaDasNotas = 0;

    for (let i =0 ; i < notas.length; i++) {
        somaDasNotas = somaDasNotas + notas[i];        
    }

const media = somaDasNotas / notas.length

    return media;    
    // console.log(media);  //aqui é para aparecer no console do devtools
}



