import store from '../store';

export const authrizeToken = (to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!store.state.auth || store.state.auth.token) {
            next({ path: '/login' });
        } else {
            next();
        }
    } else {
        next();
    }
};
