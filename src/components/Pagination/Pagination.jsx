import css from "./Pagination.module.css";
import { getPages } from "../../utils";

export default function Pagination({ page, total, onPageChange }) {
  const totalPages = total;
  if (totalPages <= 1) return null;

  const pages = getPages(page, totalPages);

  const goToFirst = () => onPageChange(1);
  const goToPrev = () => onPageChange(page - 1);
  const goToNext = () => onPageChange(page + 1);
  const goToLast = () => onPageChange(totalPages);

  return (
    <div className={css.pagination}>
      <div className={css.btnSet}>
        <button className={css.btn} disabled={page === 1} onClick={goToFirst}>
          <svg className={css.icon} style={{ marginLeft: "-5px" }}>
            <use href="/icons.svg#icon-prev" />
          </svg>
          <svg className={css.icon} style={{ marginLeft: "-13px" }}>
            <use href="/icons.svg#icon-prev" />
          </svg>
        </button>

        <button
          type="button"
          disabled={page === 1}
          onClick={goToPrev}
          className={css.btn}
        >
          <svg className={css.icon} style={{ marginLeft: "-10px" }}>
            <use href="/icons.svg#icon-prev" />
          </svg>
        </button>
      </div>

      <div className={css.pageSet}>
        {pages.map((p, index) =>
          p === "..." ? (
            <span key={`dots-${index}`} className={css.dots}>
              ...
            </span>
          ) : (
            <button
              key={`page-${p}`}
              className={`${css.pageBtn} ${p === page ? css.active : ""}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}
      </div>

      <div className={css.btnSet}>
        <button
          type="button"
          disabled={page === totalPages}
          onClick={goToNext}
          className={css.btn}
        >
          <svg className={css.icon}>
            <use href="/icons.svg#icon-next" />
          </svg>
        </button>

        <button
          className={css.btn}
          disabled={page === totalPages}
          onClick={goToLast}
        >
          <svg className={css.icon}>
            <use href="/icons.svg#icon-next" />
          </svg>
          <svg className={css.icon} style={{ marginLeft: "-13px" }}>
            <use href="/icons.svg#icon-next" />
          </svg>
        </button>
      </div>
    </div>
  );
}
