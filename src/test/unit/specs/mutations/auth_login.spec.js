import mutations from '@/store/mutations';

describe('AUTH_LOGIN mutation', () => {
  it('ミューテーションのペイロード値がauthに設定されること', () => {
    const state = {};

    const token = '12433456abced';
    const userId = 1;
    mutations.AUTH_LOGIN(state, { token, userId });

    expect(state.auth.token).to.equal(token);
    expect(state.auth.userId).to.equal(userId);
  });
});
