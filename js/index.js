import { Redactor } from "./redactor.mjs";
import { History } from "./history.mjs";

const redactors = document.querySelectorAll('app-redactor')
const history = document.querySelector('app-history')


redactors.forEach(redactor => {
    redactor.addEventListener('newMessage', e => {
        e.preventDefault

        console.log(e.detail.message)

        history.setAttribute('new-message', JSON.stringify(e.detail.message))

    })
});