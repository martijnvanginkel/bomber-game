import { Images } from './game/images/Images'
import { Map } from './game/map/Map'
import { MessageDistributor } from './game/managers/MessageDistributor'
import { NavigateButton } from './views/components/core/NavigateButton'
import { HomeScreen } from './views/components/screens/HomeScreen'
import { defineComponents } from './views/components/defineComponents'
import { createRouteManager } from './views/RouteManager'

export const images = new Images()
export const map = new Map()
export const messageDistributor = new MessageDistributor()

defineComponents()

const routeManager = createRouteManager()
routeManager.goToRoute('home')
