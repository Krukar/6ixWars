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

            <div>Inventory {{ store.inventory.count }} / {{ store.game.capacity }}</div>
        </section>

        <section class="flex justify-between">
            <div class="w-full space-y-2">
                <div>Inventory — {{ store.inventory.count }} of {{ store.game.capacity }} units used ({{ store.inventory.percent }}%)</div>

                <div
                    class="h-2 border border-current"
                    role="meter"
                    aria-label="Inventory"
                    aria-valuemin="0"
                    :aria-valuemax="store.game.capacity"
                    :aria-valuenow="store.inventory.count"
                >
                    <div class="h-full bg-current transition-[width]" :style="{ width: `${store.inventory.percent}%` }"></div>
                </div>
            </div>
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
