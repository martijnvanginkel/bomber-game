export class GameScreen extends HTMLElement {
    private shadow

    private count: number = 0

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        // console.log('gamescreen')

        // this.addEventListener('gameState', () => console.log('here3'))
        // const myApp = this._app
        // myApp.prototype.count = {
        //     hello: 1,
        // }
        // myApp.prototype.setCount = {
        //     increment: () => console.log(myApp.prototype.count),
        // }
    }

    public increment() {
        console.log('incfrement')
        this.count += 1
        this.render()
    }

    connectedCallback() {
        console.log('connected callback')
        this.render()

        addEventListener('gameState', () => console.log('state here2'))

        // const event = new CustomEvent('gameState', {
        //     bubbles: true, // bubble event to containing elements
        //     composed: true, // let the event pass through the shadowDOM boundary
        //     detail: {
        //         route: this.getAttribute('route'),
        //     },
        // })
        // this.dispatchEvent(event)
        // const event = new CustomEvent('navigate', {
        //     bubbles: true,
        //     composed: true,
        // })
        // this.dispatchEvent(event)
    }

    _app() {
        return `
            <div style="position: relative;">
                <canvas id="mapcanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 0; border: 1px solid red;"></canvas>
                <canvas id="playercanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 1; border: 1px solid red;"></canvas>
            </div>
        `
    }

    render() {
        this.shadow.innerHTML = this._app()
    }
}
