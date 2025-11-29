import { useState, useEffect, useRef } from "react";
import css from "./CitySelect.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  searchCities,
  fetchAvailableCities,
} from "../../redux/locations/locationsOperations";

import {
  selectAvailableCities,
  selectCitySearchResults,
} from "../../redux/locations/locationsSelectors";

import { clearSearchResults } from "../../redux/locations/locationsSlice";

// ❗ ВАЖЛИВО → беремо локейшн з P E T S slice
import { setLocation } from "../../redux/pets/petsSlice";

export default function CitySelect() {
  const dispatch = useDispatch();

  const available = useSelector(selectAvailableCities);
  const results = useSelector(selectCitySearchResults);

  const [value, setValue] = useState("");
  const [showList, setShowList] = useState(false);

  const boxRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAvailableCities());
  }, [dispatch]);

  const list = value.length >= 3 ? results : available;

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setShowList(true);

    if (val.length >= 3) dispatch(searchCities(val));
    else dispatch(clearSearchResults());
  };

  const handleSelect = (city) => {
    setValue(city.cityEn);
    setShowList(false);

    dispatch(setLocation(city._id));
  };

  const handleSearchClick = () => {
    if (value.length >= 3) {
      dispatch(searchCities(value));
      setShowList(true);
    }
  };

  const clearField = () => {
    setValue("");
    dispatch(setLocation(""));
    dispatch(clearSearchResults());
  };

  useEffect(() => {
    const close = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className={css.wrap} ref={boxRef}>
      <div className={css.inputBox}>
        <input
          value={value}
          onChange={handleChange}
          placeholder="Location"
          className={css.input}
        />

        {value && (
          <button type="button" className={css.clearBtn} onClick={clearField}>
            <svg className={css.icon}>
              <use href="/icons.svg#icon-cross" />
            </svg>
          </button>
        )}

        <button
          type="button"
          className={css.searchBtn}
          onClick={handleSearchClick}
        >
          <svg className={css.iconSearch}>
            <use href="/icons.svg#icon-search" />
          </svg>
        </button>
      </div>

      {showList && (
        <ul className={css.dropdown}>
          {list.length === 0 ? (
            <li>No results</li>
          ) : (
            list.map((c) => (
              <li key={c._id} onClick={() => handleSelect(c)}>
                <b>{c.cityEn.slice(0, value.length)}</b>
                {c.cityEn.slice(value.length)}, {c.stateEn}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
