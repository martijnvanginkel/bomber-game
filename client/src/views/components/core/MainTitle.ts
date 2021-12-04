export class MainTitle extends HTMLElement {
    private shadow

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #title {
                    font-size: 2em;
                    font-weight: 500;
                    color: white;
                }
            </style>

            <h1 id="title">${this.getAttribute('title')}</h1>
        `
    }
}
