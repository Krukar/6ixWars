import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { nanoid } from 'nanoid';

import { LOCATIONS } from '@Game/data';
import { carried, new_game } from '@Game/engine';

import type { GameState } from '@Game/types';

/** Returns a random 6-character seed for a new game. */
const random_seed = (): string => {
    return nanoid(6);
};

export const useGameStore = defineStore('game', () => {
    const game = ref<GameState>(new_game(random_seed()));

    const inventory_count = computed(() => carried(game.value));

    const location_name = computed(() => LOCATIONS.find((location) => location.id === game.value.location)?.name ?? game.value.location);

    const start = () => {
        game.value = new_game(random_seed());
    };

    return { game, inventory_count, location_name, start };
});
