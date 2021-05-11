export class HealthBar extends HTMLElement {
    private shadow

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    static get observedAttributes() {
        return ['steps']
    }

    attributeChangedCallback(prop: any) {
        if (prop === 'steps') {
            this.render()
        }
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #container {
                    position: relative;
                    height: 50px;
                    width: 200px;
                    border: 2px solid black;
                    border-radius: 2px;
                }
                #bar {
                    position: absolute;
                    background-color: red;
                    width: ${this.getHealthPercentage()}%;
                    height: 100%;
                }
            </style>

            <div id="container">
                <div id="bar"></div>
            </div>
        `
    }

    getHealthPercentage() {
        const current = Number(this.getAttribute('value'))
        const total = Number(this.getAttribute('steps'))
        return ((current / total) * 100).toFixed()
    }
}
