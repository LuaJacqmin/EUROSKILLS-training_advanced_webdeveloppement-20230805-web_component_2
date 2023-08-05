const redactor = document.createElement('template');

redactor.innerHTML = `
    <div class="redactor">
        <p><slot class="author"></slot></p>
        <input type="text" class="message-content"/>
        <button class="send">send message</button>
    </div>
`

class Redactor extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})

        this.shadowRoot.appendChild(redactor.content.cloneNode(true))

        this.user = 'Unknown'

        if(this.hasAttribute('name')){
            this.user = this.getAttribute('name')
            this.shadowRoot.querySelector('.author').innerHTML = this.user
        }
        
        this.messageContent = this.shadowRoot.querySelector('.message-content')

        this.button = this.shadowRoot.querySelector('.send')
        this.button.addEventListener('click', this.sendNewMessage)
    }

    connectedCallback(){
        console.log('mounted')
    }

    disconnectedCallback(){
        console.log('destroy')
    }

    sendNewMessage = (e) => {
        e.preventDefault()

        const newMessage = this.messageContent.value
        
        if(newMessage.length > 0){
            const newDate = new Date(Date.now());

            this.dispatchEvent(new CustomEvent('newMessage', 
                {
                    detail: {
                        message: {
                            message: newMessage,
                            time: newDate,
                            author: this.user
                        }
                    }
                }
            ))
        }
    }
}

customElements.define('app-redactor', Redactor)

export {Redactor};