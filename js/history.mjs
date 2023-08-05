const history = document.createElement('template')

history.innerHTML = `
    <div>
        <h2>All messages</h2>
        <ul class="messages"></ul>
    </div>
`

class History extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})

        this.shadowRoot.appendChild(history.content.cloneNode(true))

        this.domMessages = []

        this.messageslist = this.shadowRoot.querySelector('.messages')
    }

    static get observedAttributes(){
        return ['new-message']
    }
    

    connectedCallback(){
        console.log('mounted')
    }

    disconnectedCallback(){
        console.log('destroy')
    }

    attributeChangedCallback(e){
        const newMessage = JSON.parse(this.getAttribute('new-message'))

        this.domMessages = [...this.domMessages, `
            <li>
                <p>${newMessage.author} | ${newMessage.time}</p>
                <p>${newMessage.message}</p>
            </li>
        `]

        this.messageslist.innerHTML = this.domMessages.join('')
    }
}

customElements.define('app-history', History)

export {History}