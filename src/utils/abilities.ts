import { AttackBlob } from "./abilityService";

export const basic: AttackBlob[] = [
    {
        location: {
            x: 1,
            y: 0,
        },
        wait: 0,
        length: 50
    },
    {
        location: {
            x: 2,
            y: 0,
        },
        wait: 200,
        length: 50
    },
]

export const spin: AttackBlob[] = [
    {
        location: {
            x: 1,
            y: 0,
        },
        wait: 0,
        length: 20
    },
    {
        location: {
            x: 1,
            y: 1,
        },
        wait: 15,
        length: 20
    },
    {
        location: {
            x: 0,
            y: 1,
        },
        wait: 15,
        length: 20
    },
    {
        location: {
            x: -1,
            y: 1,
        },
        wait: 15,
        length: 20
    },
    {
        location: {
            x: -1,
            y: 0,
        },
        wait: 15,
        length: 20
    },
    {
        location: {
            x: -1,
            y: -1,
        },
        wait: 15,
        length: 20
    },
    {
        location: {
            x: 0,
            y: -1,
        },
        wait: 15,
        length: 20
    },
    {
        location: {
            x: 1,
            y: -1,
        },
        wait: 15,
        length: 20
    },
]
