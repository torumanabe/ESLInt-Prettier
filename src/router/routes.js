import KbnBoardView from '@/components/templates/KbnBoardView.vue';
import KbnLoginView from '@/component/templates/KbnLoginView';
import KbnTaskDetailModel from '@/components/templates/KbnTaskDetailModel';

export default [
    {
        path: '/',
        component: KbnBoardView,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        component: KbnLoginView,
    },
    {
        path: '/tasks/:id',
        component: KbnTaskDetailModel,
        meta: { requiresAuth: true },
    },
    {
        path: '*',
        redirect: '/',
    },
];
