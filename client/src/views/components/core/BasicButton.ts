export class BasicButton extends HTMLElement {
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
                #button {
                    background-color: white;
                    background-repeat: no-repeat;
                    border: none;
                    cursor: pointer;
                    overflow: hidden;
                    outline: none;
                    border: 1px solid black;
                    border-radius: 5px;
                    padding: 10px;
                    font-size: 1em;
                    font-weight: 500;
                    color: #181620;
                }
            </style>

            <button id="button" type="button">${this.getAttribute('title')}</button>
        `
    }
}
