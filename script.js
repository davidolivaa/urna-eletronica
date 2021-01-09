// variaveis de controle da interface
let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descriçao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')
let votos = []

let etapaAtual = 0
let numero = '' // sera usado pra guardar os numeros digitados e procurar no json se ha algum candidato com o numero
let votoBranco = false

function começarEtapa(){
    let etapas = etapa[etapaAtual] // associo a var etapa o elemento de indice indicado do arry etapa
    let numeroHTML = ''
    numero = ''
    votoBranco = false

    // dependendo da quantidade de numeros pra votar no candidato as divs serao criadas
    for(let i=0; i<etapas.numeros; i++){
        if(i === 0){
            numeroHTML += '<div class="numero pisca"></div>'
        } else{
            numeroHTML += '<div class="numero"></div>'
        }       
    }

    //deixa a tela em branco
    seuVotoPara.style.display = 'none'
    cargo.innerHTML= etapas.titulo // cargo recebe o conteudo de titulo do array etapa
    descriçao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHTML
}

// verifica se ha um candidato compativel com o numero digitado e atualizaa tela
function atualizaInterface(){
    let etapas = etapa[etapaAtual]
    let candidato = etapas.candidatos.filter( (item) => {
        if(item.numero === numero){
            return true
        } else{
            return false
        }
    })
    if(candidato.length > 0){
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descriçao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`

        let fotosHtml = ''
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            } else{
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }            
        }

        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display ='block'
        aviso.style.display = 'block'
        descriçao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }

    //console.log("Candidato", candidato)
}

// insere os numeros clicados na tela
function clicou(n){
    let elNumero = document.querySelector('.numero.pisca')
    if(elNumero!==null){
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca') //elemento ao lado
        } else {
            atualizaInterface()
        }        
    }
}

function branco(){
    numero = ''
    votoBranco = true

    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    descriçao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    lateral.innerHTML = ''    
}

function corrige(){
    começarEtapa()
}

function confirma(){
    let etapas = etapa[etapaAtual]
    let votoConfirmado = false

    if(votoBranco === true){
        votoConfirmado = true
        votos.push({
            etapa:etapa[etapaAtual].titulo,
            voto: 'branco'
        })
        //console.log('Branco')
    } else if(numero.length === etapas.numeros){
        votoConfirmado = true
        votos.push({
            etapa:etapa[etapaAtual].titulo,
            voto: numero
        })
        //console.log('Confirmado como '+numero)
    }

    if(votoConfirmado){
        etapaAtual++
        if( etapa[etapaAtual] !== undefined ){
            começarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos)
        }
    }
}

//window.addEventListener('load', começarEtapa)
começarEtapa()
