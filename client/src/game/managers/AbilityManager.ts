import { AbilityKey, ArrowKey } from "./InputController"

enum AbilityStatus {
    ready,
    activated,
    inCooldown
}


interface Ability {
    key: AbilityKey
    status: AbilityStatus
    cooldown: number
}

const cooldownTimes = {
    [AbilityKey.Q]: 10
}

export class AbilityManager {

    private abilities: Ability[] = []

    public constructor() {
        this.abilities = this.initializeAbilities()
    }

            
    public handleAbilityClick(key: AbilityKey) {
        const actions = {
            [AbilityStatus.ready]: this.activateAbility,
            [AbilityStatus.activated]: this.deActivateAbility,
            [AbilityStatus.inCooldown]: () => undefined,
        }

        const ability = this.abilities.find(ability => ability.key === key)
        if (!ability) {
            throw new Error('Couldnt find ability corresponding with AbilityKey')
        }

        const action = actions[ability.status]
        action()
    }

    public handleArrowClick(key: ArrowKey) {
        const 
    }

    private triggerAbility() {
        console.log('trigger ability')
    }
    
    private activateAbility() {
        console.log('activate ability')
    }
    
    private deActivateAbility() {
        console.log('deactivate ability')
    }


    private initializeAbilities() {
        return Object.keys(AbilityKey).map(key => {
            return {
                key: key as AbilityKey,
                status: AbilityStatus.ready,
                cooldown: cooldownTimes[key as AbilityKey]
            } as Ability
        })
    }
}
