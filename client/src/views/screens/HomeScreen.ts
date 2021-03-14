export class HomeScreen extends HTMLElement {
    private shadow

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.render()

        this.addEventListener('click', () => console.log('click here'))
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <div>
                <h1>Title</h1>
                <basic-button></basic-button>
            </div>
        `
    }
}
