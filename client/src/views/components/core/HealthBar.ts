export class HealthBar extends HTMLElement {
    private shadow
    private health: number

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        addEventListener('lost-health', this.lostHealth)
    }

    connectedCallback() {
        this.health = 2
        this.render()
    }

    lostHealth = (e: any) => {
        const ID = this.getAttribute('ID')
        if (!ID) {
            return
        }
        const eventID = e.detail.ID
        const health = e.detail.health
        if (Number(ID) === eventID) {
            this.health = health
            this.render()
        }
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #container {
                    position: relative;
                    color: white;
                }
            </style>

            <div id="container">${this.health}</div>
        `
    }
}
