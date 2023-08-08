let botaoLimpar = document.querySelector("#limpar");
let botaoProsseguir = document.querySelector("#prosseguir")
let numero = document.getElementById("numero");
let cidade = document.getElementById("cidade");
let form = document.querySelector("#form");
let div = document.querySelector("#resultado")
let titulo = document.querySelector("#titulo")

const formatarCep = (event) => {
  let cepInput = event.target;
  cepInput.value = mascaraCep(cepInput.value);
};

const mascaraCep = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

const consultarCep = async (event) => {
  const value = event.target.value;
  const valorCorrigido = corrigirCep(value);
  let retornoCep = await enviarCep(valorCorrigido);
  preecherCampos(retornoCep);
};

const preecherCampos = (retornoCep) => {
  document.getElementById("rua").value = retornoCep.logradouro;
  document.getElementById("bairro").value = retornoCep.bairro;
  document.getElementById("uf").value = retornoCep.uf;
  document.getElementById("uf").dispatchEvent(new Event("change"))//Cria novo evento
  document.getElementById("cidade").value = retornoCep.localidade;

};

const corrigirCep = (value) => {
  value = value.replace("-", "");
  return value;
};

const enviarCep = async (value) => {
  const response = await fetch(`https://viacep.com.br/ws/${value}/json`);
  const data = await response.json();
  return data;
};

const pegarEstadoCidade = async () => {
  const response = await fetch(
    "https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json"
  );
  const estadosCidades = await response.json();
  return estadosCidades;
};

let estados = [];
async function carregaPagina() {
  let estadosCidades = await pegarEstadoCidade();
  estados = estadosCidades.estados;
  estados.forEach((estado) => {
    let optionEstado = document.createElement("option");
    optionEstado.label = estado.nome;
    optionEstado.value = estado.sigla;
    let estadoPreenchido = document.getElementById("uf");
    estadoPreenchido.appendChild(optionEstado);
  });
}

function popularCidades(event) {
  document.querySelector("#cidade").innerHTML = "<option value=''></option>"
  document.querySelector("#cidade").removeAttribute("disabled")
  let ufSelecionado = event.target.value;
  let estadoEncontrado = estados.find(function (estado) {
    if (estado.sigla === ufSelecionado) {
      return estado;
      
    }
  });
  let listagemCidades = estadoEncontrado.cidades;
  listagemCidades.forEach((cidade) => {
    let optionCidade = document.createElement("option");
    optionCidade.label = cidade;
    optionCidade.value = cidade;
    let cidadePreenchida = document.getElementById("cidade");
    cidadePreenchida.appendChild(optionCidade);
  });
}

function habilitaProsseguir(){
    console.log(form.checkValidity()) //valida o formulário, baseado nos campos required
  if (form.checkValidity()) {
    botaoProsseguir.removeAttribute("disabled");
  } else {
    botaoProsseguir.setAttribute("disabled", "enabled");
}
}
function mostraResultado(){
  div.style.display = "block"
  form.style.display = "none"
  titulo.style.display = "none"
}



function enviar(){

  let cepEnviado = document.querySelector("#cep").value;
  let ruaEnviado = document.querySelector("#rua").value;
  let numeroEnviado = document.querySelector("#numero").value;
  let complementoEnviado = document.querySelector("#complemento").value;
  let bairroEnviado = document.querySelector("#bairro").value;
  let ufEnviado = document.querySelector("#uf").value;
  let cidadeEnviado = document.querySelector("#cidade").value;

  const formValue = {                                 
      cep: cepEnviado,
      rua: ruaEnviado,
      numero: numeroEnviado,
      complemento: complementoEnviado,
      bairro: bairroEnviado,
      estado: ufEnviado,
      cidade: cidadeEnviado,
  };

  
  mostraResultado();
  const paragrafo = document.createElement("p");
  div.appendChild(paragrafo);
  const texto = document.createTextNode(`CEP: ${cepEnviado} RUA: ${ruaEnviado}, NUMERO: ${numeroEnviado}, COMPLEMENTO: ${complementoEnviado} ,BAIRRO: ${bairroEnviado}, ESTADO: ${ufEnviado}, CIDADE: ${cidadeEnviado}`);
  paragrafo.appendChild(texto);
}

window.onload = carregaPagina;