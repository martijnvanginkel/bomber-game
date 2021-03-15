export class GameScreen extends HTMLElement {
    private shadow

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.render()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.shadow.innerHTML = `
            <style>
                #game-container {
                    position: relative;
                }
            </style>
            <div id="#game-container">
                <canvas id="mapcanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 0; border: 1px solid red;"></canvas>
                <canvas id="playercanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 1; border: 1px solid red;"></canvas>
            </div>
        `
    }
}
