export const selectUser = (state) => state.auth.user;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectToken = (state) => state.auth.token;

export const selectFavorites = (state) => {
    const favs = state.auth.user.noticesFavorites || [];

    return favs.map(f => (typeof f === "string" ? f : f._id));
};
