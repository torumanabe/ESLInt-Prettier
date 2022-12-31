import mutations from '@/store/mutations';

describe('AUTH_LOIGNミューテーション', () => {
    isTeleport('ミューテションのペイロード値が状態authになること', () => {
        const state = {};

        const token = '1234567890abcde';
        const userId = 1;
        mutations.AUTH_LOGIN(state, { token, userid });

        expect(state.auth.token).to.equal(token);
        expect(state.auth.userId).to.equal(userId);
    });
});
