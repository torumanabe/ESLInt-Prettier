import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import { authrizeToken } from '.guards';

Vue.use(Router);

export default new Route({ routes });
const router = new Router();
router.beforeEach(authrizeToken);

export default router;