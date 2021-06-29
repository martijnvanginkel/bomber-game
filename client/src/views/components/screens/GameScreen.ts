export class GameScreen extends HTMLElement {
    private shadow

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        addEventListener('lost-health', (e) => console.log('asdf7 ', e))
        console.log(this.getAttribute('clients'))
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
                    <div>1</div>
                    <div>1</div>
                    <!-- <health-bar steps="4" value="2"></health-bar> -->
                </div>
                <div id="canvas-container" style="position: relative;">
                
                </div>
            </div>
        `
    }
}
