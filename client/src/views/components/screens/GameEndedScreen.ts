export class GameEndedScreen extends HTMLElement {
    private shadow

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.listenForClicks()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <div>
                <h1>Game ended</h1>
                <div>
                    <basic-button title="Home"></basic-button>
                    <basic-button title="Retry"></basic-button>
                </div>
            </div>
        `
    }

    listenForClicks() {
        addEventListener('buttonClick', (info: CustomEventInit) => {
            if (info.detail.name === 'search-game') {
                const event = new CustomEvent('searchingForGame', {
                    bubbles: true,
                    composed: true,
                })
                this.dispatchEvent(event)
            }
        })
    }
}
