import { NavigateButton } from './core/NavigateButton'
import { GameScreen } from './screens/GameScreen'
import { HomeScreen } from './screens/HomeScreen'

export const defineComponents = () => {
    // core
    customElements.define('navigate-button', NavigateButton)

    // screens
    customElements.define('home-screen', HomeScreen)
    customElements.define('game-screen', GameScreen)
}
