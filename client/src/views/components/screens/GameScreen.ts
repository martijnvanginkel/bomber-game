export class GameScreen extends HTMLElement {
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
            <div style="position: relative;">
                <canvas id="mapcanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 0; border: 1px solid red;"></canvas>
                <canvas id="playercanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 1; border: 1px solid red;"></canvas>
            </div>
        `
    }
}
