// Calculate spawn position based on client index and map size (order of clients entering the game)
// Only for duo player right now

import { LocationType } from './../../utils/types'

export function calculateSpawnPosition(mapSize: number, playerIndex: number): LocationType {
    const x = Math.round(mapSize / 2)
    const y = playerIndex === 0 ? 1 : mapSize - 2

    return { x, y }
}
