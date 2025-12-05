import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Select from "react-select";

import {
  setSearch,
  setCategory,
  setGender,
  setType,
  resetFilters,
} from "../../redux/pets/petsSlice";

import {
  selectCategories,
  selectGenders,
  selectTypes,
  selectPetsSearch,
  selectPetsCategory,
  selectPetsGender,
  selectPetsType,
  selectPetsLocation,
  selectPetsSort,
  selectAreFiltersActive,
} from "../../redux/pets/petsSelectors";

import { fetchAvailableCities } from "../../redux/locations/locationsOperations";
import { clearSearchResults } from "../../redux/locations/locationsSlice";

import { fetchPets } from "../../redux/pets/petsOperations";

import SearchField from "../SearchField/SearchField";
import Dropdown from "../Dropdown/Dropdown";
import CitySelect from "../CitySelect/CitySelect";
import TagsFilter from "../TagsFilter/TagsFilter";

import css from "./NoticesFilters.module.css";

export default function NoticesFilters() {
  const dispatch = useDispatch();

  const search = useSelector(selectPetsSearch);
  const category = useSelector(selectPetsCategory);
  const gender = useSelector(selectPetsGender);
  const type = useSelector(selectPetsType);
  const location = useSelector(selectPetsLocation);
  const sort = useSelector(selectPetsSort);
  const areFiltersActive = useSelector(selectAreFiltersActive);

  const categoriesList = useSelector(selectCategories);
  const gendersList = useSelector(selectGenders);
  const typesList = useSelector(selectTypes);

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    dispatch(fetchAvailableCities());
  }, [dispatch]);

  // 🔁 Автоматичний повторний запит при зміні будь-якого фільтра
  useEffect(() => {
    dispatch(fetchPets());
  }, [search, category, gender, type, location, sort, dispatch]);

  const handleSearchSubmit = () => {
    dispatch(setSearch(localSearch));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setLocalSearch("");
    dispatch(clearSearchResults());
  };

  return (
    <div className={css.filterBox}>
      <div className={css.firstRow}>
        {/* SEARCH FIELD */}
        <SearchField
          value={localSearch}
          onChange={setLocalSearch}
          onSubmit={handleSearchSubmit}
          variant="notices"
        />

        {/* CATEGORY */}
        <Dropdown
          label="Category"
          value={category}
          options={categoriesList}
          onChange={(val) => dispatch(setCategory(val))}
          showAll={true}
        />

        {/* GENDER */}
        <Dropdown
          label="By gender"
          value={gender}
          options={gendersList}
          onChange={(val) => dispatch(setGender(val))}
          showAll={true}
        />

        {/* TYPE */}
        <Dropdown
          label="By type"
          value={type}
          options={typesList}
          onChange={(val) => dispatch(setType(val))}
          showAll={true}
        />

        {/* CITY AUTOCOMPLETE */}
        <CitySelect />
      </div>

      {/* SORT */}
      <div className={css.secondRow}>
        <TagsFilter />

        {/* RESET */}
        {areFiltersActive && (
          <button type="button" className={css.resetBtn} onClick={handleReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
