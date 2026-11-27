import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { nanoid } from 'nanoid';

import { LOCATIONS } from '@Game/data';
import { carried, new_game } from '@Game/engine';

import type { GameState } from '@Game/types';

/** Returns a random 6-character seed for a new game. */
const random_seed = (): string => nanoid(6);

export const useGameStore = defineStore('game', () => {
    const game = ref<GameState>(new_game(random_seed()));

    const inventory = computed(() => {
        const count = carried(game.value);

        return { count, percent: Math.floor((count / game.value.capacity) * 100) };
    });

    const location_name = computed(() => LOCATIONS.find((location) => location.id === game.value.location)?.name ?? game.value.location);

    /** Replaces the current game with a brand new one. */
    const start = () => {
        game.value = new_game(random_seed());
    };

    return {
        game,
        inventory,
        location_name,
        start,
    };
});
