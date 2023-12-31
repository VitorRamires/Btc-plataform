const painelConvesor = document.querySelector('.conversor-painel')
const BtnConversor = document.querySelector('.botao-converter')
const conversorInput = document.querySelector('#input-btc')
let verificador = false

function fetchBTCconversorMoeda(){
  fetch('https://blockchain.info/ticker')
  .then(response=>{
    let responseJson = response.json()
    return responseJson
  })
  .then(responseJson => {
    let allCurrencys = responseJson
    return allCurrencys
  })
  .then((allCurrencys) => {
    let arrayCurrencys = Object.entries(allCurrencys)
    converterHandler(arrayCurrencys) 
  })
}

function converterHandler(BTC){
  let BTCvalue = conversorInput.value
  if(BTCvalue === '' || BTCvalue === '0'){
    alert('Preencha corretamente')
    conversorInput.value = ''
  } else {
    BTC.forEach((item, index)=>{
      let calculo = Number(BTCvalue * BTC[index][1].sell).toFixed(0)
      if((verificador === false )){
        let createElement = document.createElement('div')
        let title = document.createElement('p')
        let value = document.createElement('p')

        createElement.classList.add('moedaBTC-conversor', 'showOn', 'convertido')
        title.classList.add('title-conversor')
        value.classList.add('value-conversor')

        painelConvesor.appendChild(createElement)
        createElement.appendChild(title)
        createElement.appendChild(value)

        value.innerHTML = calculo 
        title.innerHTML = BTC[index][0]
      } else {
        let novoValor = document.querySelectorAll('.value-conversor')
        novoValor.forEach((item, index)=>{
          let novoCalculo = Number(BTCvalue * BTC[index][1].sell).toFixed(0)
          item.innerHTML = novoCalculo
        })
      }
    })
    verificador = true
  }
}




BtnConversor.addEventListener('click',  fetchBTCconversorMoeda)