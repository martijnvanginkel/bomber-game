export class Button extends HTMLElement {
    private shadow

    constructor() {
        // Always call super first in constructor
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.render()

        // Element functionality written in here
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <button type="button">Click Me!</button>
        `
    }
}
