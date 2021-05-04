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
        name: 'waiting',
        screen: 'waiting-screen',
    },
    {
        name: 'game',
        screen: 'game-screen',
    },
    {
        name: 'gameEnded',
        screen: 'game-ended-screen',
    },
]
