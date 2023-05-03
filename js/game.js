const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const characters = [ // carrega as cartas pelo nome da img
    'beth', 'jerry', 'jessica', 'meeseeks', 'morty', 'pessoa-passaro',
    'pickle-rick', 'rick', 'scroopy', 'summer',
];


const createElement = (tag, className) => { //função mais eficiente que cria as divs e as classes
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = ''; // var primeiro clique
let secondCard = ''; // var segundo clique

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card'); // seleciona todos os elementos com a classe disabled-card

    if(disabledCards.length === 20){ // caso as cartas desativadas for igual a 20, acabou o jogo
        alert('Parábens, você conseguiu!');
    }
}

const checkCards = () => { // array para checar se as duas escolhas são iguais através dos atributos de cada uma(data-character)

    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){ // desativa as duas cartas

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = ''; // qnd acertar, faz o reset para a escolha de duas novas cartas
        secondCard = '';

        checkEndGame();

    }else { // caso a pessoa erre a combinação das cartas

        setTimeout(() => { // tempo de 500ms após o erro, para que a pessoa veja a última carta sendo revelada; Se não, seria instantâneo o reset.

        firstCard.classList.remove('reveal-card'); // remove a classe 'reveal-card', a escondendo novamente
        secondCard.classList.remove('reveal-card');

        firstCard = '';
        secondCard = '';

        }, 500);
    }
}

const revealCard = ({target}) => { // revela as cartas após um evento clique | target: é o element que foi clicado

    if(target.parentNode.className.includes('reveal-card')) { // verifica se a carta já está virada, se sim, não será possível virar novamente!
        return;
    }

    if(firstCard === ''){ // se a primeira carta ainda não foi escolhida, envia escolha para 'firstCard'

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if(secondCard === ''){ // se a primeira carta já foi escolhida, o segundo clique(2ª variavel) será direcionado para 'secondCard'

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const creatCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    // maneira menos eficiente de gerar os cards
 /* const card = document.createElement('div') // cria um elemento html, sendo especificado sua tag
    const front = document.createElement('div')
    const back = document.createElement('div')

    card.className = 'card'
    back.className = 'face back'
    front.className = 'face front'
 */

    front.style.backgroundImage = `url('../img/${character}.png')`; // adiciona variavel img dinâmica como backgroundimage

    card.appendChild(front); // acrescenta um filho a const card
    card.appendChild(back);

    card.addEventListener('click', revealCard); // adiciona um evento de clique à classe card

    card.setAttribute('data-character', character); // dá um atributo único e diferencial(nome) à cada uma das cartas

    return card;
}

const loadGame = () => {
    
    const duplicateCharacters = [ ...characters, ...characters ]; // espalha os elementos de um array já existente(linha 3) em outro(no caso, duas vezes).

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5); // função para embaralhar aleatoriamente as cartas

    shuffledArray.forEach((character) => {

        const card = creatCard(character);
        grid.appendChild(card);

    })
}

const startTimer = () => {
    setInterval(() => { // loop

        const currentTime = Number(timer.innerHTML)
        timer.innerHTML = currentTime + 1

    }, 1000) // 1s = 1000ms
}

window.onload = () => { // executa uma ação, somente depois da página ser carregada por completa

    spanPlayer.innerHTML = localStorage.getItem('player') // exibe a variável na tela, vinda do local storage

    // startTimer();
    loadGame();
}