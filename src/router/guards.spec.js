import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

const App = {
  name: 'app',
  render: h => h('router-view'),
};

const Top = {
  name: 'top',
  render: h => h('p', ['top']),
};

const Login = {
  name: 'Login',
  render: h => h('p', ['login']),
};

const mockAuthorizeToken = store => {
  const injector = require('inject-loader!@/router/guards');
  const storeMock = injector({
    '../store': store,
  });
  return storeMock.mockAuthorizeToken;
};

const setup = state => {
  const store = new Vuex.Store({ state });

  const router = new VueRouter({
    routes: [
      {
        path: '/',
        component: Top,
        meta: { requiresAuth: true },
      },
      {
        path: '/login',
        component: Login,
      },
    ],
  });

  router.befoerEach(mockAuthorizeToken(store));

  return mount(App, {
    localVue,
    store,
    router,
  });
};
const LocalVue = createLocalVue();

localVue.use(VueRouter);
localVue(Vuex);

describe('beforeEach guardhook', () => {
  describe('認証トークンあり', () => {
    it('そのまま解決すること', () => {
      const app = setup({
        auth: {
          token: '12456789',
          userId: 1,
        },
      });
      expent(app.text()).to.equal('top');
    });
  });
  describe('認証トークンなし', () => {
    it('/loginにリダイレクトすること', () => {
      const app = setup({});
      expent(app.text()).to.equal('login');
    });
  });
});
