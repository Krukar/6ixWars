import { ITEMS, LOCATIONS, START } from './data'
import type { GameState, ItemId, LocationId } from './types'

const SELL_CHANCE = 0.75

export function nextRandom(state: number): { value: number; state: number } {
    const next = (state + 0x6d2b79f5) | 0
    let t = Math.imul(next ^ (next >>> 15), next | 1)
    t = (t + Math.imul(t ^ (t >>> 7), t | 61)) ^ t
    return { value: ((t ^ (t >>> 14)) >>> 0) / 4294967296, state: next }
}

function rollPrices(rngState: number): { prices: Partial<Record<ItemId, number>>; rngState: number } {
    const prices: Partial<Record<ItemId, number>> = {}
    let state = rngState
    for (const item of ITEMS) {
        const sold = nextRandom(state)
        const price = nextRandom(sold.state)
        state = price.state
        if (sold.value < SELL_CHANCE) {
            prices[item.id] = item.minPrice + Math.floor(price.value * (item.maxPrice - item.minPrice + 1))
        }
    }
    return { prices, rngState: state }
}

function homeId(): LocationId {
    const home = LOCATIONS.find((location) => location.isHome)
    if (!home) throw new Error('LOCATIONS needs one location with isHome: true')
    return home.id
}

function isValidQuantity(quantity: number): boolean {
    return Number.isInteger(quantity) && quantity > 0
}

export function carried(state: GameState): number {
    return Object.values(state.inventory).reduce((total, quantity) => total + quantity, 0)
}

export function newGame(seed: number): GameState {
    const market = rollPrices(seed)
    return {
        status: 'playing',
        day: 1,
        location: homeId(),
        cash: START.cash,
        debt: START.debt,
        bank: 0,
        capacity: START.capacity,
        inventory: Object.fromEntries(ITEMS.map((item) => [item.id, 0])) as Record<ItemId, number>,
        prices: market.prices,
        rngState: market.rngState,
        log: [],
    }
}

export function travel(state: GameState, to: LocationId): GameState {
    if (state.status !== 'playing' || to === state.location) return state
    if (state.day >= START.days) return { ...state, status: 'gameOver' }
    const market = rollPrices(state.rngState)
    return {
        ...state,
        day: state.day + 1,
        location: to,
        debt: Math.round(state.debt * (1 + START.dailyInterest)),
        prices: market.prices,
        rngState: market.rngState,
    }
}

export function buy(state: GameState, item: ItemId, quantity: number): GameState {
    const price = state.prices[item]
    if (state.status !== 'playing' || price === undefined || !isValidQuantity(quantity)) return state
    if (price * quantity > state.cash || carried(state) + quantity > state.capacity) return state
    return {
        ...state,
        cash: state.cash - price * quantity,
        inventory: { ...state.inventory, [item]: state.inventory[item] + quantity },
    }
}

export function sell(state: GameState, item: ItemId, quantity: number): GameState {
    const price = state.prices[item]
    if (state.status !== 'playing' || price === undefined || !isValidQuantity(quantity)) return state
    if (quantity > state.inventory[item]) return state
    return {
        ...state,
        cash: state.cash + price * quantity,
        inventory: { ...state.inventory, [item]: state.inventory[item] - quantity },
    }
}
