let botaoLimpar = document.querySelector('#limpar')


const formatarCep = (event) => {
    let cepInput = event.target
    cepInput.value = mascaraCep(cepInput.value)
}

const mascaraCep = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{5})(\d)/,'$1-$2')
    return value
}

const consultarCep = async (value) => {
    const apiUrl = `https://viacep.com.br/ws/${value}/json`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data);
}

//Validação de CEP input
// cepInput.addEventListener("keypress", (e) => {
//     const apenasNumeros = /[0-9]/;
//     const key = String.fromCharCode(e.keyCode);

//     if(!apenasNumeros.test(key)) {
//         e.preventDefault();
//         return;
//     }
// });

function limpa_formulario() {
    document.getElementById('cep').value=("");
    document.getElementById('rua').value=("");
    document.getElementById('numero').value=("");
    document.getElementById('complemento').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('uf').value=("");
    document.getElementById('cidade').value=("");
}

botaoLimpar.onclick = limpa_formulario;
