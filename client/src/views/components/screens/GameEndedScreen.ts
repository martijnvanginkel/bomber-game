export class GameEndedScreen extends HTMLElement {
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
                <h1>Game ended</h1>
                <div>
                    <basic-button id="homeButton" title="Home"></basic-button>
                    <basic-button id="retryButton" title="Retry"></basic-button>
                </div>
            </div>
        `
    }

    listenForClicks() {
        const homeButton = this.shadow.getElementById('homeButton')
        const retryButton = this.shadow.getElementById('retryButton')

        homeButton?.addEventListener('click', () => {
            const event = new CustomEvent('goHome', { bubbles: true, composed: true })
            this.dispatchEvent(event)
        })

        retryButton?.addEventListener('click', () => {
            const event = new CustomEvent('searchingForGame', { bubbles: true, composed: true })
            this.dispatchEvent(event)
        })
    }
}
