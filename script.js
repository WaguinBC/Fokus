const html = document.querySelector('html');
const listaDeBotao = document.querySelectorAll('.app__card-button');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () =>{
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

for (let contador = 0; contador < listaDeBotao.length; contador++){
    var contexto = ['foco','descanso-curto', 'descanso-longo'];
    var imagem = [`/imagens/${contexto[contador]}.png`, '/imagens/descanso-curto.png', '/imagens/descanso-longo.png'];

    listaDeBotao[contador].addEventListener('click', () => {
        html.setAttribute('data-contexto', contexto[contador]);
        banner.setAttribute('src', `/imagens/${contexto[contador]}.png`);
        listaDeBotao.forEach(function (contexto){
            contexto.classList.remove('active');
        })
        
        switch (contexto[contador]) {
            case "foco":
                titulo.innerHTML = `
                Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
                listaDeBotao[contador].classList.add('active');
                tempoDecorridoEmSegundos = 1500;
                mostratTempo();
                break;
            case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
                ` 
                listaDeBotao[contador].classList.add('active');
                tempoDecorridoEmSegundos = 300;
                mostratTempo();
                break;
            case "descanso-longo":
                titulo.innerHTML = `
                Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
                `
                listaDeBotao[contador].classList.add('active');
                tempoDecorridoEmSegundos = 900;
                mostratTempo();
            default:
                break;
        }
    })
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play();
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostratTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

 function iniciarOuPausar() {
    if (intervaloId){
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    iniciarOuPausarBtIcone.setAttribute('src', '/imagens/pause.png');
 }

 function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    iniciarOuPausarBtIcone.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
 }

 function mostratTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
 }

 mostratTempo();