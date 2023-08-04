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

const consultarCep = async (event) => {
    const value = event.target.value
    const valorCorrigido = corrigirCep(value)
    let retornoCep = await enviarCep(value)
    console.log(retornoCep);
    preecherCampos(retornoCep);
}

const preecherCampos = (retornoCep) => {
    document.getElementById('rua').value=(retornoCep.logradouro);
    document.getElementById('bairro').value=(retornoCep.bairro);
}

const corrigirCep = (value) => {
    value = value.replace("-", "")
    return value
}

const enviarCep = async (value) => {
    const response = await fetch(`https://viacep.com.br/ws/${value}/json`)
    const data = await response.json()
    return data
}

const pegarEstadoCidade = async () => {
    const response = await fetch('https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json')
    const estadosCidades = await response.json()
    return estadosCidades
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

async function carregaPagina(){
    let estadosCidades = await pegarEstadoCidade()
    let estados = estadosCidades.estados
    estados.forEach(estado => {
        
        let optionEstado = document.createElement("option")
        optionEstado.label = estado.nome
        optionEstado.value = estado.sigla
        
        let estadoPreenchido = document.getElementById('uf')
        estadoPreenchido.appendChild(optionEstado)

    });

    let cidades = estadosCidades.cidades

}

botaoLimpar.onclick = limpa_formulario;
window.onload = carregaPagina;

