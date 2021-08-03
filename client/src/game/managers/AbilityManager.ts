import { ActionData, ActionType } from './ActionEmitter'
import { AbilityKey, ArrowKey } from './InputController'

enum AbilityStatus {
    ready,
    activated,
    inCooldown,
}

interface Ability {
    status: AbilityStatus
    cooldown: number
}

const cooldownTimes = {
    [AbilityKey.Q]: 10,
}

export class AbilityManager {
    private abilities: { [key: string]: Ability }

    public constructor() {
        this.abilities = this.initializeAbilities()
    }

    public handleAbilityClick(key: AbilityKey) {
        const actions = {
            [AbilityKey.Q]: {
                [AbilityStatus.ready]: this.activateAbility,
                [AbilityStatus.activated]: this.deActivateAbility,
                [AbilityStatus.inCooldown]: () => {},
            },
        }

        const ability = this.abilities[key]
        const action = actions[key][ability.status]

        action(key)
    }

    public handleArrowClick(key: ArrowKey): ActionData {
        return {
            type: ActionType.move,
            arrowKey: key,
        }
        // return findMove
        // if (!this.isAnAbilityActivated) {
        //     return {
        //         type: 'move',
        //         arrowKey: key,
        //     } as ActionData
        // }
        // return {
        //     type: 'move',
        //     arrowKey: key,
        // } as ActionData
        // const actions = {
        //     [AbilityKey.Q]: fireDistanceBounce(),
        // }
    }

    private triggerAbility() {
        console.log('trigger ability')
    }

    private activateAbility = (key: AbilityKey) => {
        console.log('activate')
        const ability = this.abilities[key]
        ability.status = AbilityStatus.activated
        this.fireActivateEvent(true, key)
    }

    private deActivateAbility = (key: AbilityKey) => {
        console.log('de-activate')
        const ability = this.abilities[key]
        ability.status = AbilityStatus.ready
        this.fireActivateEvent(false, key)
    }

    private get isAnAbilityActivated() {
        for (const key in this.abilities) {
            const ability = this.abilities[key]
            if (ability.status === AbilityStatus.activated) {
                return true
            }
        }
        return false
    }

    private fireActivateEvent(activated: boolean, ability: AbilityKey) {
        const event = new CustomEvent('activate-ability', {
            detail: {
                activated: activated,
                ability: ability,
            },
            bubbles: true,
            composed: true,
        })
        dispatchEvent(event)
    }

    private initializeAbilities() {
        const abilities = {}

        Object.keys(AbilityKey).forEach((key) => {
            Object.assign(abilities, {
                [key]: {
                    status: AbilityStatus.ready,
                    cooldown: cooldownTimes[key as AbilityKey],
                } as Ability,
            })
        })
        return abilities
    }
}
