import { AbilityKey, ArrowKey } from './InputController'

enum AbilityStatus {
    ready,
    activated,
    inCooldown,
}

interface Ability {
    // key: AbilityKey
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
            [AbilityStatus.ready]: this.activateAbility,
            [AbilityStatus.activated]: this.deActivateAbility,
            [AbilityStatus.inCooldown]: () => undefined,
        }

        const ability = this.abilities[key]
        const action = actions[ability.status]

        action(key)
    }

    public handleArrowClick(key: ArrowKey) {
        // const
    }

    private triggerAbility() {
        console.log('trigger ability')
    }

    private activateAbility = (key: AbilityKey) => {
        console.log('activate ability')
        console.log(this.abilities)
        const ability = this.abilities[key]
        ability.cooldown = 3 //AbilityStatus.activated
        console.log(this.abilities)
        // ability.status = AbilityStatus.activated
        // console.log(this.abilities)
        // this.fireActivateEvent(true, key)
    }

    private deActivateAbility = (key: AbilityKey) => {
        console.log('deactivate ability')
        this.fireActivateEvent(false, key)
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
