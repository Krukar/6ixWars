// This file is handled entirely by Claude (I only asked for stylistic changes)
import { ITEMS, LOCATIONS, START } from './data';
import type { GameState, ItemId, LocationId } from './types';

const SELL_CHANCE = 0.75;

/* ====================
    Private
==================== */

/** Returns the id of the location flagged as home, throwing if none is defined. */
const home_id = (): LocationId => {
    const home = LOCATIONS.find((location) => location.isHome);
    if (!home) throw new Error('LOCATIONS needs one location with isHome: true');
    return home.id;
};

/** Returns true if the quantity is a positive whole number. */
const is_valid_quantity = (quantity: number): boolean => {
    return Number.isInteger(quantity) && quantity > 0;
};

/** Rolls a new market: each item has a SELL_CHANCE of being for sale, at a random price within its min/max range. */
const roll_prices = (rng_state: number): { prices: Partial<Record<ItemId, number>>; rng_state: number } => {
    const prices: Partial<Record<ItemId, number>> = {};
    let state = rng_state;
    for (const item of ITEMS) {
        const sold = next_random(state);
        const price = next_random(sold.state);
        state = price.state;
        if (sold.value < SELL_CHANCE) {
            prices[item.id] = item.minPrice + Math.floor(price.value * (item.maxPrice - item.minPrice + 1));
        }
    }
    return { prices, rng_state: state };
};

/* ====================
    Public
==================== */

/** Buys a quantity of an item at the current price if it's for sale and the player has the cash and space. */
export const buy = (state: GameState, item: ItemId, quantity: number): GameState => {
    const price = state.prices[item];
    if (state.status !== 'playing' || price === undefined || !is_valid_quantity(quantity)) return state;
    if (price * quantity > state.cash || carried(state) + quantity > state.capacity) return state;
    return {
        ...state,
        cash: state.cash - price * quantity,
        inventory: { ...state.inventory, [item]: state.inventory[item] + quantity },
    };
};

/** Returns the total number of units currently in the player's inventory. */
export const carried = (state: GameState): number => {
    return Object.values(state.inventory).reduce((total, quantity) => total + quantity, 0);
};

/** Creates a fresh game state at the home location with starting cash, debt and an initial market. */
export const new_game = (seed: number): GameState => {
    const market = roll_prices(seed);
    return {
        status: 'playing',
        day: 1,
        location: home_id(),
        cash: START.cash,
        debt: START.debt,
        bank: 0,
        capacity: START.capacity,
        inventory: Object.fromEntries(ITEMS.map((item) => [item.id, 0])) as Record<ItemId, number>,
        prices: market.prices,
        rngState: market.rng_state,
        log: [],
    };
};

/** Seeded PRNG (mulberry32): returns a value in [0, 1) and the next state. */
export const next_random = (state: number): { value: number; state: number } => {
    const next = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(next ^ (next >>> 15), next | 1);
    t = (t + Math.imul(t ^ (t >>> 7), t | 61)) ^ t;
    return { value: ((t ^ (t >>> 14)) >>> 0) / 4294967296, state: next };
};

/** Sells a quantity of an item at the current price if it's for sale and the player has enough. */
export const sell = (state: GameState, item: ItemId, quantity: number): GameState => {
    const price = state.prices[item];
    if (state.status !== 'playing' || price === undefined || !is_valid_quantity(quantity)) return state;
    if (quantity > state.inventory[item]) return state;
    return {
        ...state,
        cash: state.cash + price * quantity,
        inventory: { ...state.inventory, [item]: state.inventory[item] - quantity },
    };
};

/** Moves to a new location: advances the day, compounds debt interest and rolls a new market, or ends the game on the last day. */
export const travel = (state: GameState, to: LocationId): GameState => {
    if (state.status !== 'playing' || to === state.location) return state;
    if (state.day >= START.days) return { ...state, status: 'gameOver' };
    const market = roll_prices(state.rngState);
    return {
        ...state,
        day: state.day + 1,
        location: to,
        debt: Math.round(state.debt * (1 + START.dailyInterest)),
        prices: market.prices,
        rngState: market.rng_state,
    };
};
