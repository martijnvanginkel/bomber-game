export interface Route {
    name: string
    component: HTMLElement
}

export const routes: Route[] = [
    {
        name: 'home',
        component: document.createElement('home-screen'),
    },
    {
        name: 'game',
        component: document.createElement('game-screen'),
    },
]
