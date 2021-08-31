export class HomeScreen extends HTMLElement {
    private shadow

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
        this.listenForClicks()
    }

    render() {
        this.shadow.innerHTML = `

            <style>
                #container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                }
            </style>

            <div id="container">
                <main-title title="COOL NAME"></main-title>
                <basic-button id="searchButton" title="SEARCH"></basic-button>
                <ability-bar id="ability-bar"></ability-bar>
            </div>

        `
    }

    listenForClicks() {
        const btn = this.shadow.getElementById('searchButton')
        btn?.addEventListener('click', () => {
            const event = new CustomEvent('searchingForGame', { bubbles: true, composed: true })
            this.dispatchEvent(event)
        })
    }
}
