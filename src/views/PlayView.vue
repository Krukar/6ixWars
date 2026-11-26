<script setup lang="ts">
import { START } from '@Game/data'
import { useGameStore } from '@Stores/game'

import { format_money } from '@Game/format'

import FullscreenButton from '@Components/FullscreenButton.vue'

const store = useGameStore()
store.start()
</script>

<template>
    <main>
        <section>
            <div>6ix Wars</div>

            <div>Day {{ store.game.day }} / {{ START.days }}</div>

            <div>{{ store.location_name }}</div>

            <div><FullscreenButton /></div>
        </section>

        <section>
            <div>Cash {{ format_money(store.game.cash) }}</div>

            <div>Bank {{ format_money(store.game.bank) }}</div>

            <div>Debt {{ format_money(store.game.debt) }}</div>

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
