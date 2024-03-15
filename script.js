const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const temporizador = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');

const musicaFoco = new Audio ('./sons/luna-rise-part-one.mp3');
const beep = new Audio ('./sons/beep.mp3');
const pause = new Audio ('./sons/pause.mp3');
const play = new Audio ('./sons/play.wav');
const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 

musicaFoco.loop = true;

let contagemTemporizador = 5;
let intervaloId = null;

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active')
});

musicaFocoInput.addEventListener('change', () => {
    if (musicaFoco.paused) {
        musicaFoco.play();
    } else {
        musicaFoco.pause();
    }
});

function alterarContexto (contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
};

const contagemRegressiva = () => {
    if (contagemTemporizador <= 0) {
        beep.play()
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    contagemTemporizador -= 1;
    console.log('Temporizador:' + contagemTemporizador);
};

temporizador.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        pause.play();
        zerar();
        return;
    };
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
}
    
function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    intervaloId = null;
}

