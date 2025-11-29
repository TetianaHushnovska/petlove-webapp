export const selectUser = (state) => state.auth.user || { name: "", email: "", avatarURL: null };
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectToken = (state) => state.auth.token;
