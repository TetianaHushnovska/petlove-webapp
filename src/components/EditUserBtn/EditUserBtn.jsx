import css from "./EditUserBtn.module.css";

export default function EditUserBtn({ mode = "profile", onClick }) {
  if (mode === "photo") {
    return (
      <button type="button" className={css.upload} onClick={onClick}>
        Upload photo
      </button>
    );
  }

  // режим profile (іконка)
  return (
    <button type="button" className={css.editBtn} onClick={onClick}>
      <svg className={css.icon}>
        <use href="/icons.svg#icon-edit" />
      </svg>
    </button>
  );
}
