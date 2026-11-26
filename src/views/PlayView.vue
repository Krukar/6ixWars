<script setup lang="ts">
import { START } from '@Game/data';
import { useGameStore } from '@Stores/game';

import { format_money } from '@Game/format';

import FullscreenButton from '@Components/FullscreenButton.vue';

const store = useGameStore();
store.start();
</script>

<template>
    <main class="w-2/3 mx-auto space-y-10 my-10">
        <section class="flex justify-between">
            <div>6ix Wars</div>

            <div>Day {{ store.game.day }} / {{ START.days }}</div>

            <div>{{ store.location_name }}</div>

            <div><FullscreenButton /></div>
        </section>

        <section class="flex justify-between">
            <div>Cash {{ format_money(store.game.cash) }}</div>

            <div>Bank {{ format_money(store.game.bank) }}</div>

            <div>Debt {{ format_money(store.game.debt) }}</div>

            <div>inventory</div>
        </section>

        <section class="flex justify-between">
            <div>inventory bar</div>
        </section>

        <section class="flex justify-between">
            <div>market</div>
        </section>

        <section class="flex justify-between">
            <div>travel to</div>
        </section>

        <section class="flex justify-between">
            <div>bank</div>

            <div>loan shark</div>

            <div>log</div>
        </section>
    </main>
</template>
