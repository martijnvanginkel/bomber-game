import { BasicButton } from './core/BasicButton'
import { GameScreen } from './screens/GameScreen'
import { HomeScreen } from './screens/HomeScreen'
import { WaitingScreen } from './screens/WaitingScreen'

export const defineComponents = () => {
    // core
    customElements.define('basic-button', BasicButton)

    // screens
    customElements.define('home-screen', HomeScreen)
    customElements.define('waiting-screen', WaitingScreen)
    customElements.define('game-screen', GameScreen)
}
