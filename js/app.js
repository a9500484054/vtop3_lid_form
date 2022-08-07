(function() {

    const blockService = document.querySelectorAll('.block-service')
    const btn = document.querySelectorAll('.btn')

    const serviceForm = document.querySelector('#service-form')

    let count = 0
    let result = 0

    const interest = Math.floor(100/(blockService.length - 1))

    const btnJsNext = document.querySelector('#btn-js-next')
    const btnJsBack = document.querySelector('#btn-js-back')
    const btnJsSend = document.querySelector('#btn-js-send')
    const btnJsMain = document.querySelector('#btn-js-main')

    const resultProgress = document.querySelector('.result__progress')
    const resultInterest = document.querySelector('.result__interest')
    const resultNumber = document.querySelector('.result__number')

    const nameInput = document.querySelector("input[name='name']")
    const emailInput = document.querySelector("input[name='email']")
    const phoneInput = document.querySelector("input[name='phone']")

    function validName() {
        const regName = /^[а-яА-Я\-]{0,}\s[а-яА-Я\-]{1,}(\s[А-Я][а-яА-Я\-]{1,})?$/
                
        if(!regName.test(nameInput.value)) {
            nameInput.parentNode.classList.add('error')
            nameInput.parentNode.classList.add('error--name')
        } else {
            nameInput.parentNode.classList.remove('error')
            nameInput.parentNode.classList.remove('error--name')
        }

        if(nameInput.value === '') {
            nameInput.parentNode.classList.add('error')
            nameInput.parentNode.classList.add('error--name')
        }
    }

    function validEmail() {
        const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if(!reg.test(emailInput.value)) {
            emailInput.parentNode.classList.add('error')
            emailInput.parentNode.classList.add('error--email')
        } else {
            emailInput.parentNode.classList.remove('error')
            emailInput.parentNode.classList.remove('error--email')
        }

        if(nameInput.value === '') {
            emailInput.parentNode.classList.add('error')
            emailInput.parentNode.classList.add('error--email')
        } 
    }

    function validPhone() {
        if(phoneInput.value.length == 19) {
            phoneInput.parentNode.classList.remove('error')
            phoneInput.parentNode.classList.remove('error--phone')
        } else {
            phoneInput.parentNode.classList.add('error')
            phoneInput.parentNode.classList.add('error--phone')
        }

        if(phoneInput.value === '') {
            phoneInput.parentNode.classList.add('error')
            phoneInput.parentNode.classList.add('error--phone')
        }
    }
    
    const serializeForm = (formNode) => new FormData(formNode)

    document.addEventListener("DOMContentLoaded", () => {

        btnJsNext.addEventListener('click', function() {
            count++
            blockService.forEach(elem => elem.classList.remove('block-service--active'))
            blockService[count].classList.add('block-service--active')
            if(count > 0) {
                btnJsBack.classList.add('btn--active')
            }
            if(blockService.length - count === 2) {
                btnJsNext.classList.remove('btn--active')
                btnJsSend.classList.add('btn--active')
            }

            result += interest

            resultNumber.textContent = result
            resultInterest.style.left = result + '%'
            resultProgress.style.width = result + '%'
        })

        btnJsBack.addEventListener('click', function() {
            count--
            blockService.forEach(elem => elem.classList.remove('block-service--active'))
            blockService[count].classList.add('block-service--active')
            if(count === 0) {
                btnJsBack.classList.remove('btn--active')
            }

            result -= interest

            resultNumber.textContent = result           
            resultProgress.style.width = result + '%'
            resultInterest.style.left = result + '%'
            if(btnJsSend.classList.contains('btn--active')) {
                btnJsSend.classList.remove('btn--active')
                btnJsNext.classList.add('btn--active')
            }
        })

        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();

            validName()
            validEmail()
            validPhone()

            let arr = Array.from(serializeForm(serviceForm).entries())
            let i = 0
            arr.forEach((element) => {
                if(element.indexOf('') === 1) i++
            })  
            

            if(i === 0) {
                if(document.querySelector('.error') === null) {
                    blockService.forEach(elem => elem.classList.remove('block-service--active'))
                    btn.forEach(elem => elem.classList.remove('btn--active'))
                    btnJsMain.classList.add('btn--active')
                    blockService[blockService.length - 1].classList.add('block-service--active')
                    resultNumber.textContent = 100           
                    resultInterest.style.left = '100%'
                    resultProgress.style.width = '100%'
                    console.log('Отправка!')
                    console.log(JSON.parse(JSON.stringify(arr)))
                }
            } 

        })
        

    });
    
})();

