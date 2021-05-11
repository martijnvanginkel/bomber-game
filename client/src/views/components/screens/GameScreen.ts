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
            <style>
                #container {
                    position: relative;
                    width: 500px;
                }
                #top-bar {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    justify-content: space-between;
                }
            </style>

            <div id="container">
                <div id="top-bar">
                    <health-bar steps="4" value="2"></health-bar>
                    <health-bar steps="4" value="3"></health-bar>
                </div>
                <div style="position: relative;">
                    <canvas id="mapcanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 0; border: 1px solid red;"></canvas>
                    <canvas id="playercanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 1; border: 1px solid red;"></canvas>
                </div>
            </div>
        `
    }
}
