import { Route, routes } from './routes'

class RouteManager {
    private available: boolean = false
    private container: HTMLElement
    private currentRoute: Route | undefined

    constructor(private routes: Route[]) {
        this.findContainerElement()
    }

    private findContainerElement() {
        const container = document.getElementById('container')
        if (!container) {
            return
        }
        this.container = container
        this.available = true
    }

    private findRoute(routeName: string) {
        return this.routes.find((route: Route) => route.name === routeName)
    }

    public goToRoute(routeName: string) {
        if (!this.available) {
            throw new Error('Unable to move routes')
        }
        const route = this.findRoute(routeName)
        if (!route) {
            throw new Error('Route not found')
        }
        this.container.appendChild(route.component)
        // if (!this.isExistingRoute(route)) {
        //     throw new Error('Not an existing route')
        // }
    }
}

export const createRouteManager = () => {
    return new RouteManager(routes)
}
