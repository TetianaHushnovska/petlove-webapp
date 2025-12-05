export const selectFavorites = (state) => state.favorites.favorites ?? [];

export const selectViewed = (state) => state.favorites.viewed;

export const selectFavoritesLoading = (state) => state.favorites.isLoading;
export const selectFavoritesError = (state) => state.favorites.error;

export const selectActiveTab = (state) => state.favorites.activeTab;

export const selectIsFavorite = (id) => (state) =>
    state.favorites.favorites.some((item) => item._id === id);
