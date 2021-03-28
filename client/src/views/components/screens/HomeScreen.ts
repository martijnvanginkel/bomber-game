export class HomeScreen extends HTMLElement {
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
                <h1>Title</h1>
                <basic-button title="Search for game" name="search-game"></basic-button>
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
