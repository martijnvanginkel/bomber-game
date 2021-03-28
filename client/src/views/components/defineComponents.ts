import { BasicButton } from './core/BasicButton'
import { GameScreen } from './screens/GameScreen'
import { HomeScreen } from './screens/HomeScreen'

export const defineComponents = () => {
    // core
    customElements.define('basic-button', BasicButton)

    // screens
    customElements.define('home-screen', HomeScreen)
    customElements.define('game-screen', GameScreen)
}
