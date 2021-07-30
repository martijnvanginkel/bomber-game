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
                #ability-bar {
                    position: absolute;
                    right: 0;
                }
            </style>

            <div id="container">
                <div id="top-bar">
                    <!-- <health-bar steps="4" value="2"></health-bar> -->
                </div>
                <div id="canvas-container" style="position: relative;">
                
                </div>
                <div id="ability-bar">
                    <ability-icon></ability-icon>
                </div>
            </div>
        `
    }
}
