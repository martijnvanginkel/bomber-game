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
            <div>
                <h1>Title</h1>
                <basic-button id="searchButton" title="Search for game"></basic-button>
                <ability-icon></ability-icon>
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
