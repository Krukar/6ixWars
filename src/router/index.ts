import { createRouter, createWebHistory } from 'vue-router';
import TitleView from '@/views/TitleView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'title', component: TitleView },
        { path: '/play', name: 'play', component: () => import('@/views/PlayView.vue') },
        { path: '/scores', name: 'scores', component: () => import('@/views/ScoresView.vue') },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
});

export default router;
