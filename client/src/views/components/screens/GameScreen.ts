enum GameState {
    WAITING,
    PLAYING,
}

export class GameScreen extends HTMLElement {
    private shadow

    private state: GameState = GameState.WAITING

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()

        addEventListener('gameState', () => {
            this.state = GameState.PLAYING
            this.render()
        })
    }

    render() {
        if (this.state === GameState.PLAYING) {
            this.shadow.innerHTML = `
                <div style="position: relative;">
                    <canvas id="mapcanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 0; border: 1px solid red;"></canvas>
                    <canvas id="playercanvas" width="500" height="500" style="position: absolute; left: 0; top: 0; z-index: 1; border: 1px solid red;"></canvas>
                </div>
            `
        } else {
            this.shadow.innerHTML = `
                <div>
                    <h1>Waiting</h1>
                </div>
            `
        }
    }
}
