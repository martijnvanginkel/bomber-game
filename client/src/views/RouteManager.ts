import { Route, routes } from './routes'

class RouteManager {
    private container: HTMLElement
    private currentRoute: Route

    constructor(private routes: Route[]) {
        this.findContainerElement()
        addEventListener('navigate', (info: any) => this.goToRoute(info.detail.route))
        // addEventListener('gameState', () => console.log('game state'))
    }

    private findContainerElement() {
        const container = document.getElementById('container')
        if (!container) {
            return
        }
        this.container = container
    }

    private findRoute(routeName: string) {
        return this.routes.find((route: Route) => route.name === routeName)
    }

    private removeCurrentScreen() {
        if (!this.currentRoute) {
            return
        }
        const el = document.querySelector(this.currentRoute.screen)
        if (!el) {
            return
        }
        this.container.removeChild(el)
    }

    private addScreen(route: Route) {
        const el = document.createElement(route.screen)
        if (!el) {
            return
        }
        this.container.appendChild(el)
        this.currentRoute = route
    }

    public goToRoute(routeName: string) {
        if (!this.container) {
            throw new Error('Unable to move routes')
        }
        const route = this.findRoute(routeName)
        if (!route) {
            throw new Error('Route not found')
        }
        this.removeCurrentScreen()
        this.addScreen(route)
    }
}

export const createRouteManager = () => {
    return new RouteManager(routes)
}