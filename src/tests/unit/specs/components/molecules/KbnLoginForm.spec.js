import { mount } from '@vue/test-utils';
import * as sinon from 'sinon';
import KbnLoginForm from '@/components/molecules/KbnLoginForm';

describe('KbnLoginForm', () => {
  describe('プロパティ', () => {
    describe('validation', () => {
      let loginForm;
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} },
        });
        loginForm.vm.$nextTick(done);
      });

      describe('email', () => {
        describe('required', () => {
          describe('何も入力されていない', () => {
            it('validation.email.requiredがinvalidであること', () => {
              loginForm.setData({ email: '' });
              expect(loginForm.vm.validation.email.required).to.equal(false);
            });
          });

          describe('入力あり', () => {
            it('validation.email.formatがinvalidであること', () => {
              loginForm.setData({ email: 'foo@domai.com' });
              expect(loginForm.vm.validation.email.required).to.equal(true);
            });
          });
        });

        describe('format', () => {
          describe('メールアドレス形式でないフォーマット', () => {
            it('validation.email.formatがinvalidであること', () => {
              loginForm.setData({ email: 'footer' });
              expect(loginForm.vm.validation.email.format).to.equal(false);
            });
          });

          describe('メールアドレス形式のフォーマット', () => {
            it('validation.email.formatがvaildであること', () => {
              loginForm.setData({ email: 'foo@domai.com' });
              expect(loginForm.vm.validation.email.format).to.equal(true);
            });
          });
        });
      });

      describe('password', () => {
        describe('required', () => {
          describe('何も入力されていない', () => {
            it('validation.password.requiredがinvalidであること', () => {
              loginForm.setData({ password: '' });
              expect(loginForm.vm.validation.password.required).to.equal(false);
            });
          });
        });
        describe('入力あり', () => {
          it('validation.password.requiredがvalidであること', () => {
            loginForm.setData({ password: 'xxxx' });
            expect(loginForm.vm.validation.password.required).to.equal(true);
          });
        });
      });
    });
  });

  describe('valid', () => {
    let loginForm;
    beforeEach(done => {
      loginForm = mount(KbnLoginForm, {
        propsData: { onlogin: () => {} },
      });
      loginForm.vm.$nextTick(done);
    });

    describe('バリデーション項目全てOK', () => {
      it('validになること', () => {
        loginForm.setData({
          email: 'foo@dmain.com',
          password: '12345678',
        });
        expect(loginForm.vm.valid).to.equal(true);
      });

      describe('バリデーションNG項目あり', () => {
        it('invalidになること', () => {
          loginForm.setData({
            email: 'foo@domai.com',
            password: '',
          });
          expect(loginForm.vm.valid).to.equal(false);
        });
      });
    });
    describe('disableLoginAction', () => {
      let loginForm;
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} },
        });
        loginForm.vm.$nextTick(done);
      });
    });

    describe('バリデーション項目すべてOKかつログイン処理中', () => {
      it('ログイン処理は無効', () => {
        loginForm.setData({
          email: 'foo@domain.com',
          password: '12345678',
          progress: true,
        });
        expect(loginForm.vm.disableLoginAction).equal(true);
      });
    });
  });

  describe('onlogin', () => {
    let loginForm;
    let onloginStub;
    beforeEach(done => {
      onloginStub = sinon.stub();
      loginForm = mount(KbnLoginForm, {
        propsData: { onlogin: onloginStub },
      });
      loginForm.setData({
        email: 'foo@dmain.com',
        password: '12345678',
      });
      loginForm.vm.$nextTick(done);
    });

    describe('resolve', () => {
      it('resolveされること', done => {
        onloginStub.resolves();
        //clickevent
        loginForm.find('button').trigger('click');
        expect(onloginStub.called).to.equal(false);
        expect(loginForm.vm.error).to.equal('');
        expect(loginForm.vm.disableLoginAction).to.equal(true);

        //状態の反映
        loginForm.vm.$nextTick(() => {
          expect(onloginStub.called).to.equal(true);
          const authInfo = onloginStub.args[0][0];
          expect(authInfo.email).to.equal(loginForm.vm.email);
          expect(authInfo.password).to.equal(loginForm.vm.password);
          loginForm.vm.$nextTick(() => {
            expect(loginForm.vm.error).to.equal('');
            expect(loginForm.vm.disableLoginAction).to.equal(false);
            done();
          });
        });
      });
    });

    describe('reject', () => {
      it('rejectされること', done => {
        onloginStub.rejects(new Error('login error!'));

        loginForm.find('button').trigger('click');
        expect(onloginStub.called).to.equal(false);
        expect(loginForm.vm.error).to.equal('');
        expect(loginForm.vm.disableLoginAction).to.equal(true);

        loginForm.vm.$nextTick(() => {
          expect(onloginAStub.called).to.equal(true);
          const authInfo = onloginStub.args[0][0];
          expect(authInfo.email).to.equal(loginForm.vm.email);
          expect(authInfo.password).to.equal(loginForm.vm.password);
          loginForm.vm.$nextTick(() => {
            expect(loginForm.vm.error).to.equal('login error');
            expect(loginForm.vm.disableLoginAction).to.equal(false);
            done();
          });
        });
      });
    });
  });
});
