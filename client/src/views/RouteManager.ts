import { Route, routes } from './routes'

class RouteManager {
    private container: HTMLElement
    private currentRoute: Route

    constructor(private routes: Route[]) {
        this.findContainerElement()
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

    private addScreen(route: Route, attribute?: { [key: string]: any }) {
        const el = document.createElement(route.screen)
        if (attribute) {
            el.setAttribute('screen-attribute', JSON.stringify(attribute))
        }
        if (!el) {
            return
        }
        this.container.appendChild(el)
        this.currentRoute = route
    }

    public goToRoute(routeName: string, attribute?: { [key: string]: any }) {
        if (!this.container) {
            throw new Error('Unable to move routes')
        }
        const route = this.findRoute(routeName)
        if (!route) {
            throw new Error('Route not found')
        }
        this.removeCurrentScreen()
        this.addScreen(route, attribute)
    }
}

export const createRouteManager = () => {
    return new RouteManager(routes)
}
