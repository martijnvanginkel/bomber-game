export interface Route {
    name: string
    screen: string
}

export const routes: Route[] = [
    {
        name: 'home',
        screen: 'home-screen',
    },
    {
        name: 'game',
        screen: 'game-screen',
    },
]
