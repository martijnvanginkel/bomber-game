import { BasicButton } from './core/BasicButton'
import { HealthBar } from './core/HealthBar'
import { GameEndedScreen } from './screens/GameEndedScreen'
import { GameScreen } from './screens/GameScreen'
import { HomeScreen } from './screens/HomeScreen'
import { WaitingScreen } from './screens/WaitingScreen'

export const defineComponents = () => {
    // core
    customElements.define('basic-button', BasicButton)

    // in-game
    customElements.define('health-bar', HealthBar)

    // screens
    customElements.define('home-screen', HomeScreen)
    customElements.define('waiting-screen', WaitingScreen)
    customElements.define('game-screen', GameScreen)
    customElements.define('game-ended-screen', GameEndedScreen)
}
