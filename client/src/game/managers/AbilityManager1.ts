// import { ActionData, ActionType } from './ActionEmitter'
// import { AbilityKey, ArrowKey } from './InputController'

// enum AbilityStatus {
//     ready,
//     activated,
//     inCooldown,
// }

// interface Ability {
//     key: AbilityKey.Q
//     status: AbilityStatus
//     cooldown: number
// }

// const cooldownTimes = {
//     [AbilityKey.Q]: 10,
// }

// export class AbilityManager {
//     private abilities: { [key: string]: Ability }

//     public constructor() {
//         this.abilities = this.initializeAbilities()
//     }

//     // This should be kind of inside of the abilities itself with cooldown,  and the trigger CustomEvent shoulud be in the abstract 'parent'
//     public handleAbilityClick(key: AbilityKey) {
//         const actions = {
//             [AbilityKey.Q]: {
//                 [AbilityStatus.ready]: this.activateAbility,
//                 [AbilityStatus.activated]: this.deActivateAbility,
//                 [AbilityStatus.inCooldown]: () => {},
//             },
//         }

//         const ability = this.abilities[key]
//         const action = actions[key][ability.status]

//         action(key)
//     }

//     public handleArrowClick(arrowKey: ArrowKey): ActionData {
//         const ability = this.getActivatedAbility

//         if (!ability) {
//             return {
//                 type: ActionType.move,
//                 arrowKey: arrowKey,
//             }
//         }

//         this.triggerAbility(ability.key, arrowKey)

//         return {
//             type: ActionType.ability,
//             abilityKey: ability.key,
//             arrowKey: arrowKey,
//         }
//     }

//     private triggerAbility(abilityKey: AbilityKey, arrowKey: ArrowKey) {
//         this.fireTriggerEvent(abilityKey, arrowKey)
//     }

//     private activateAbility = (key: AbilityKey) => {
//         console.log('activate')
//         const ability = this.abilities[key]
//         ability.status = AbilityStatus.activated
//         this.fireActivateEvent(true, key)
//     }

//     private deActivateAbility = (key: AbilityKey) => {
//         console.log('de-activate')
//         const ability = this.abilities[key]
//         ability.status = AbilityStatus.ready
//         this.fireActivateEvent(false, key)
//     }

//     private get getActivatedAbility() {
//         for (const key in this.abilities) {
//             const ability = this.abilities[key]
//             if (ability.status === AbilityStatus.activated) {
//                 return ability
//             }
//         }
//         return null
//     }

//     private fireActivateEvent(activated: boolean, abilityKey: AbilityKey) {
//         const event = new CustomEvent('activate-ability', {
//             detail: {
//                 activated: activated,
//                 abilityKey: abilityKey,
//             },
//             bubbles: true,
//             composed: true,
//         })
//         dispatchEvent(event)
//     }

//     private fireTriggerEvent(abilityKey: AbilityKey, arrowKey: ArrowKey) {
//         const event = new CustomEvent('trigger-ability', {
//             detail: {
//                 abilityKey: abilityKey,
//                 arrowKey: arrowKey,
//             },
//             bubbles: true,
//             composed: true,
//         })
//         dispatchEvent(event)
//     }

//     private initializeAbilities() {
//         const abilities = {}

//         Object.keys(AbilityKey).forEach((key) => {
//             Object.assign(abilities, {
//                 [key]: {
//                     key: key,
//                     status: AbilityStatus.ready,
//                     cooldown: cooldownTimes[key as AbilityKey],
//                 } as Ability,
//             })
//         })
//         return abilities
//     }
// }
