export const selectAvailableCities = (state) => state.locations.list;
export const selectCitySearchResults = (state) => state.locations.searchResults;

export const selectCityNameById = (state, id) => {
    const city = state.locations.list.find(c => c._id === id);
    return city ? `${city.cityEn}, ${city.stateEn}` : "Unknown location";
};
