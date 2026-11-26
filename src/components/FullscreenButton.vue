<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import IconMaximize from '@Components/SVGs/IconMaximize.vue'
import IconMinimize from '@Components/SVGs/IconMinimize.vue'

const can_fullscreen = document.fullscreenEnabled
const is_fullscreen = ref(false)

const sync_fullscreen = () => {
    is_fullscreen.value = document.fullscreenElement !== null
}

const toggle_fullscreen = () => {
    if (document.fullscreenElement) {
        void document.exitFullscreen()
    } else {
        void document.documentElement.requestFullscreen()
    }
}

onMounted(() => {
    sync_fullscreen()
    document.addEventListener('fullscreenchange', sync_fullscreen)
})

onBeforeUnmount(() => document.removeEventListener('fullscreenchange', sync_fullscreen))
</script>

<template>
    <button v-if="can_fullscreen" type="button" :aria-label="is_fullscreen ? 'Exit fullscreen' : 'Fullscreen'" @click="toggle_fullscreen">
        <IconMinimize v-if="is_fullscreen" width="24" height="24" />
        <IconMaximize v-else width="24" height="24" />
    </button>
</template>
