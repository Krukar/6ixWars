<script setup lang="ts">
import { START } from '@/game/data'
import { useGameStore } from '@/stores/game'

const store = useGameStore()
store.start()
</script>

<template>
    <main>
        <section>
            <div>6ix Wars</div>

            <div>Day {{ store.game.day }} / {{ START.days }}</div>

            <div>location</div>

            <div>fullscreen</div>
        </section>

        <section>
            <div>cash</div>

            <div>bank</div>

            <div>debt</div>

            <div>inventory</div>
        </section>

        <section>
            <div>inventory bar</div>
        </section>

        <section>
            <div>market</div>
        </section>

        <section>
            <div>travel to</div>
        </section>

        <section>
            <div>bank</div>

            <div>loan shark</div>

            <div>log</div>
        </section>
    </main>
</template>
