const input = document.querySelector('.login__input')
const button = document.querySelector('.login__button')
const form = document.querySelector('.login-form')

const validateInput = ({target}) => {
    if(target.value.length > 4){
        // console.log(event.target) - acessado o target, consegue acessar o elemento que disparou o evento!
        // console.log(event.target.value) - retorna o valor em si / o que foi digitado!
        button.removeAttribute('disabled')
        return // encerra a condição e finaliza a função sem passar pelas linhas restantes da função
    }
    button.setAttribute('disabled', '')
}

const handleSubmit = (event) => {
    event.preventDefault() // bloqueia o refresh da página após o submit
    localStorage.setItem('player', input.value) // banco de dados do browser, salva localmente os valores enviados pelo input
    window.location = '../pages/game.html' // redireciona para a página do game
}


input.addEventListener('input', validateInput)
form.addEventListener('submit', handleSubmit)