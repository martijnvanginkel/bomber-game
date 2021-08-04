export class HealthBar extends HTMLElement {
    private shadow

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    static get observedAttributes() {
        return ['steps']
    }

    attributeChangedCallback(propName: string, oldValue: string, newValue: string) {
        console.log
        console.log(propName, oldValue, newValue)
        // if (prop === 'steps') {
        //     this.render()
        // }
    }

    // attributeChangedCallback(propName: string) {
    //     console.log('prop ')
    //     console.log(this.getAttribute(propName))
    //     console.log(propName)
    //     // if (prop === 'activated') {
    //     //     this.render()
    //     // }
    // }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #container {
                    position: relative;
                    height: 25px;
                    width: 100px;
                    border: 1px solid black;
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
