<template>
    <main>
        <h1>6ix Wars</h1>

        <p>Drug Wars but set in Toronto</p>

        <nav>
            <RouterLink :to="{ name: 'play' }">New game</RouterLink>
            <RouterLink :to="{ name: 'scores' }">High scores</RouterLink>
        </nav>
    </main>
</template>
