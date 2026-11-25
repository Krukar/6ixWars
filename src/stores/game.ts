import { defineStore } from 'pinia'
import { ref } from 'vue'

import { newGame } from '@Game/engine'

import type { GameState } from '@Game/types'

function randomSeed(): number {
    return Math.floor(Math.random() * 0x100000000)
}

export const useGameStore = defineStore('game', () => {
    const game = ref<GameState>(newGame(randomSeed()))

    function start() {
        game.value = newGame(randomSeed())
    }

    return { game, start }
})
