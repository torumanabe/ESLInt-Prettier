import Vue from 'vue';
import * as types from '@/store/mutation-types';

const mockLoginAction = login => {
  const actionInjector = require('inject-loader!@/store/actions');

  const actionsMocks = actionInjector({
    '.../api': {
      Auth: { login },
    },
  });
  return actionsMocks.default.login;
};

describe('login アクション', () => {
  const address = 'foo@domain.com';
  const password = '12345678';
  let commit;
  let future;

  describe('Auth.loginが成功', () => {
    const token = '1234567890abcde';
    const userId = 1;

    beforeEach(done => {
      const login = authInfo => Promise.resolve({ token, userId });
      const action = mockLoginAction(login);
      commit = sinon.spy();

      future = action({ commit }, { address, password });
      Vue.nextTick(done);

      it('成功となること', () => {
        expect(commit.called).to.equal(true);
        expect(commit.args[0][0]).to.equal(types.AUTH_LOGIN);
        expect(commit.args[0][1].token).to.equal(token);
        expect(commit.args[0][1].userId).to.equal(userId);
      });
    });

    describe('Auth.loginが失敗', () => {
      beforeEach(done => {
        const login = authInfo => Promise.reject(new Error('login failed'));
        const action = mockLoginAction(login);
        commit = sinon.spy();

        future = action({ commit });
        Vue.nextTick(done);
      });

      it('失敗となること', () => {
        expect(commit.called).to.equal(false);
        future.catch(err => {
          expect(err.message).to.equal('login failed');
          done();
        });
      });
    });
  });
});
