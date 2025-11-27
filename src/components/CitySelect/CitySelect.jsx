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

  /**
   * 🔥 Search results НЕ містять _id
   * Тому ми шукаємо відповідність у availableCities
   * і повертаємо місто з _id, або fallback
   */
  const mergedList =
    value.length >= 3
      ? results.map((res) => {
          const searchName = (res.cityEn || "").toLowerCase();

          const match = available.find(
            (a) => (a.city || "").toLowerCase() === searchName
          );

          return match
            ? match
            : {
                _id: null,
                city: res.cityEn,
                state: res.stateEn,
              };
        })
      : available;

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setShowList(true);

    if (val.length >= 3) {
      dispatch(searchCities(val));
    } else {
      dispatch(clearSearchResults());
    }
  };

  /**
   * 🔥 Найважливіше: передаємо в бекенд НАЗВУ міста
   * а не _id, бо API фільтрує тільки за cityName
   */
  const handleSelect = (city) => {
    const cityName = city.city || city.cityEn || "";
    console.log("Selected city:", cityName);
    setValue(cityName);
    setShowList(false);

    dispatch(setLocation(cityName)); // передаємо назву міста
  };

  const clearField = () => {
    setValue("");
    dispatch(setLocation(""));
    dispatch(clearSearchResults());
  };

  // close dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
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

        <button type="button" className={css.searchBtn}>
          <svg className={css.iconSearch}>
            <use href="/icons.svg#icon-search" />
          </svg>
        </button>
      </div>

      {showList && value.length >= 1 && mergedList.length > 0 && (
        <ul className={css.dropdown}>
          {mergedList.map((c, index) => {
            const cityName = c.city || c.cityEn || "";
            const stateName = c.state || c.stateEn || "";

            return (
              <li
                key={c._id || `${cityName}-${index}`} // 🔥 гарантовано унікальний ключ
                onClick={() => handleSelect(c)}
              >
                <b>{cityName.slice(0, value.length)}</b>
                {cityName.slice(value.length)}, {stateName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
