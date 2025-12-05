export const selectUser = (state) => state.auth.user;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectToken = (state) => state.auth.token;

export const selectUserPets = (state) =>
    Array.isArray(state.auth.user.pets) ? state.auth.user.pets : [];
