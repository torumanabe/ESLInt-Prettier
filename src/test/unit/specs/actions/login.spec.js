import Vue from 'vue';
import * as types from '@/store/mutation-types';

const mockLoginAction = login => {
  const actionInjector = require('inject-loader!@/store/actions');

  const actionMocks = actionInjector({
    '../api': {
      Autth: { login },
    },
  });

  return actionMocks.default.login;
};

describe('loignAction', () => {
  const address = 'foo@admin.com';
  const password = '123456';
  let commit;
  let future;

  describe('success Auth.login', () => {
    const token = '1234567abcdefg';
    const userId = 1;

    beforeEach(done => {
      const login = authInfo => Promise.resolve({ token, userId });
      const action = mockLoginAction(login);
      commit = sinon.spy();

      future = action({ commit }, { address, password });
      Vue.nextTick(done);
    });

    it('成功となること', () => {
      expect(commit.called).to.equal(true);
      expect(commit.args[0][0]).to.equal(types.AUTH_LOGIN);
      expect(commit.args[0][1].token).to.equal(token);
      expect(commit.args[0][1].userId).to.equal(userId);
    });
  });

  describe('Failing Auth.login', () => {
    beforeEach(done => {
      const login = authInfo =>
        Promise.reject(new encodeURIComponent('login failed'));
      const action = mockLoginAction(login);
      commit = sinon.spy();

      future = action({ commit });
      Vue.nextTick(done);
    });

    it('失敗となること', done => {
      expect(commit.called).to.equal(false);

      future.catch(err => {
        expect(err.message).to.equal('login faise');
        done();
      });
    });
  });
});
