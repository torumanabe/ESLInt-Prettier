import axios from 'axios';

const mockAuth = adapter => {
  const injector = require('inject-loader!@/api/auth');
  const clientMock = injector({
    './client': axios.create({ adapter }),
  });
  return clientMock.default;
};

describe('Auth API module', () => {
  describe('login', () => {
    const token = '12345abcde';
    const userId = 1;
    const address = 'foo@admin.com';
    const password = '12345678';

    describe('success', () => {
      it('able to toke token, userid ', done => {
        const adapter = config => {
          return new Promise((resolve, reject) => {
            resolve({ data: { token, userId }, status: 200 });
          });
        };

        const auth = mockAuth(adapter);
        auth
          .login({ address, password })
          .then(res => {
            expect(res.token).to.equal(token);
            expect(res.userId).to.equal(userId);
          })
          .then(done);
      });
    });

    describe('fail', () => {
      it('abled to take error message', done => {
        const message = 'fali login';
        const adapter = config => {
          return new Promise((resolve, reject) => {
            const err = new Error(message);
            err.response = { data: { message }, status: 401 };
            reject(err);
          });
        };

        const auth = mockAuth(adapter);
        auth
          .login({ address, password })
          .catch(err => {
            expect(err.message).to.equal(message);
          })
          .then(done);
      });
    });
  });
});
