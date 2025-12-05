// === SELECTORS ===
export const selectPetsItems = (state) => state.pets.items;
export const selectPetsTotalPages = (state) => state.pets.totalPages;
export const selectPetsPage = (state) => state.pets.page;
export const selectPetsLimit = (state) => state.pets.limit;
export const selectPetsLoading = (state) => state.pets.isLoading;
export const selectPetsError = (state) => state.pets.error;

/* === FILTER SELECTORS === */
export const selectPetsSearch = (state) => state.pets.search;
export const selectPetsCategory = (state) => state.pets.category;
export const selectPetsGender = (state) => state.pets.gender;
export const selectPetsType = (state) => state.pets.type;
export const selectPetsLocation = (state) => state.pets.location;
export const selectPetsSort = (state) => state.pets.sort;

/* === LOOKUP LISTS === */
export const selectCategories = (state) => state.pets.categoriesList || [];
export const selectGenders = (state) => state.pets.gendersList || [];
export const selectTypes = (state) => state.pets.typesList || [];
export const selectLocations = (state) => state.pets.locationsList || [];

/* === ACTIVE FILTER FLAG === */
export const selectAreFiltersActive = (state) => {
    const p = state.pets;
    return (
        p.search ||
        p.category ||
        p.gender ||
        p.type ||
        p.location ||
        p.sort
    );
};