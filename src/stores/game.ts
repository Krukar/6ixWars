import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { LOCATIONS } from '@Game/data'
import { newGame } from '@Game/engine'

import type { GameState } from '@Game/types'

function randomSeed(): number {
    return Math.floor(Math.random() * 0x100000000)
}

export const useGameStore = defineStore('game', () => {
    const game = ref<GameState>(newGame(randomSeed()))

    const location_name = computed(() => LOCATIONS.find((location) => location.id === game.value.location)?.name ?? game.value.location)

    function start() {
        game.value = newGame(randomSeed())
    }

    return { game, location_name, start }
})
