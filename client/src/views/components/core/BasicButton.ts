export class BasicButton extends HTMLElement {
    private shadow

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    click() {
        const event = new CustomEvent('buttonClick', {
            bubbles: true,
            composed: true,
            detail: {
                name: this.getAttribute('name'),
            },
        })
        this.dispatchEvent(event)
    }

    static get observedAttributes() {
        return ['name']
    }

    connectedCallback() {
        this.render()
        const btn = this.shadow.querySelector('#button')
        btn?.addEventListener('click', () => this.click())
    }

    render() {
        this.shadow.innerHTML = `
            <button id="button" type="button">${this.getAttribute('title')}</button>
        `
    }
}
