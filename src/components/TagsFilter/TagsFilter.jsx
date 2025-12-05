import css from "./TagsFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../redux/pets/petsSlice";
import { selectPetsSort } from "../../redux/pets/petsSelectors";

const tags = [
  { value: "popular", label: "Popular" },
  { value: "cheap", label: "Cheap" },
];

export default function TagsFilter() {
  const dispatch = useDispatch();
  const sortValue = useSelector(selectPetsSort);

  const handleSortClick = (value) => {
    dispatch(setSort(sortValue === value ? "" : value));
  };

  return (
    <div className={css.tagsRow}>
      {tags.map((tag) => {
        const isActive = sortValue === tag.value;

        return (
          <button
            key={tag.value}
            className={`${css.tag} ${isActive ? css.active : ""}`}
            onClick={() => handleSortClick(tag.value)}
          >
            <span>{tag.label}</span>
            {isActive && (
              <svg className={css.icon}>
                <use href="/icons.svg#icon-cross" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}
