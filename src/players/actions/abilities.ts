import { LocationType } from '../../utils/types'

export type Ability = AttackBlob[]

export interface AttackBlob {
    location: LocationType
    wait: number
    duration: number
}

export const basicAttack: Ability = [
    {
        location: {
            x: 1,
            y: 0,
        },
        wait: 0,
        duration: 50,
    },
    {
        location: {
            x: 2,
            y: 0,
        },
        wait: 200,
        duration: 50,
    },
]

export const spinAttack: Ability = [
    {
        location: {
            x: 1,
            y: 0,
        },
        wait: 0,
        duration: 20,
    },
    {
        location: {
            x: 1,
            y: 1,
        },
        wait: 15,
        duration: 20,
    },
    {
        location: {
            x: 0,
            y: 1,
        },
        wait: 15,
        duration: 20,
    },
    {
        location: {
            x: -1,
            y: 1,
        },
        wait: 15,
        duration: 20,
    },
    {
        location: {
            x: -1,
            y: 0,
        },
        wait: 15,
        duration: 20,
    },
    {
        location: {
            x: -1,
            y: -1,
        },
        wait: 15,
        duration: 20,
    },
    {
        location: {
            x: 0,
            y: -1,
        },
        wait: 15,
        duration: 20,
    },
    {
        location: {
            x: 1,
            y: -1,
        },
        wait: 15,
        duration: 20,
    },
]
