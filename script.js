let botaoLimpar = document.querySelector('#limpar')

//Máscara de CEP
const formatarCep = (event) => {
    let input = event.target
    input.value = mascaraCep(input.value)
}

const mascaraCep = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{5})(\d)/,'$1-$2')
    return value
}

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