import css from "./SearchField.module.css";

export default function SearchField({
  value,
  onChange,
  onSubmit,
  variant = "news",
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={`${css.input} ${css[variant]}`}
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button type="submit" className={css.searchBtn}>
        <svg className={css.icon}>
          <use href="/icons.svg#icon-search" />
        </svg>
      </button>

      {value && (
        <button
          type="button"
          className={css.clearBtn}
          onClick={() => onChange("")}
        >
          <svg className={`${css.icon} ${css.clearIcon}`}>
            <use href="/icons.svg#icon-cross" />
          </svg>
        </button>
      )}
    </form>
  );
}
