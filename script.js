//Função assíncrona
async function buscaEndereco(cep) {

    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '';

    //Tratamento de resposta
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`); //Consumindo a API
        var consultaCEPConvertida = await consultaCEP.json(); //Transformando a promise em json
        // Caso de erro no console
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        // Caso exista ele busca os elementos dentro da API
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        
        //Atribui o valor retornado da API
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        
        // Imprime as respostas
        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch(erro) {
        // Se der erro exibe uma mensagem para o usuário 
        mensagemErro.innerHTML =   `<p>CEP inválido. Tente novamente!</p>`;
        console.log(erro);
    }
}

// Busca o cep e caso seja válido atribui os valores retornados quando é clicado fora da caixa de texto. 
var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));
