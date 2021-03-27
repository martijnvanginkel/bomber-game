export class NavigateButton extends HTMLElement {
    private shadow

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    buttonClick() {
        const event = new CustomEvent('navigate', {
            bubbles: true, // bubble event to containing elements
            composed: true, // let the event pass through the shadowDOM boundary
            detail: {
                route: this.getAttribute('route'),
            },
        })
        this.dispatchEvent(event)
    }

    static get observedAttributes() {
        return ['route']
    }

    connectedCallback() {
        this.render()
        const btn = this.shadow.querySelector('#button')
        btn?.addEventListener('click', () => this.buttonClick())
    }

    render() {
        this.shadow.innerHTML = `
            <button id="button" type="button">Click Me!</button>
        `
    }
}
