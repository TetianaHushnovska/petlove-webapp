import { useEffect } from "react";
import css from "./ModalNotice.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNoticeById,
  addFavorite,
  removeFavorite,
} from "../../redux/pets/petsOperations";

import { selectFavoriteIds } from "../../redux/pets/petsSelectors";
import { safeValue, formatDate } from "../../utils/formatValue";

export default function ModalNotice({ id, onClose }) {
  const dispatch = useDispatch();

  const notice = useSelector((state) => state.pets.currentNotice);
  const favoriteIds = useSelector(selectFavoriteIds);
  const isFav = favoriteIds.includes(id);

  useEffect(() => {
    dispatch(fetchNoticeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleFavorite = () => {
    if (!notice) return;

    if (isFav) dispatch(removeFavorite(id));
    else dispatch(addFavorite(id));
  };

  if (!notice) {
    return (
      <div className={css.backdrop}>
        <div className={css.modal}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={css.backdrop} onClick={handleBackdrop}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.iconClose}>
            <use href="/icons.svg#icon-cross" />
          </svg>
        </button>

        <div className={css.imgWrap}>
          <img src={notice.imgURL} className={css.image} alt={notice.title} />
          <p className={css.category}>{notice.category}</p>
        </div>

        <h3 className={css.title}>{notice.title}</h3>

        <div className={css.rating}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-star" />
          </svg>
          {notice.popularity}
        </div>

        <div className={css.details}>
          <div className={css.box}>
            <p className={css.param}>Name</p>
            <p className={css.paramDetail}>{safeValue(notice.name)}</p>
          </div>
          <div className={css.box}>
            <p className={css.param}>Birthday</p>
            <p className={css.paramDetail}>{formatDate(notice.birthday)}</p>
          </div>
          <div className={css.box}>
            <p className={css.param}>Sex</p>
            <p className={css.paramDetail}>{safeValue(notice.sex)}</p>
          </div>
          <div className={css.box}>
            <p className={css.param}>Species</p>
            <p className={css.paramDetail}>{safeValue(notice.species)}</p>
          </div>
        </div>

        <p className={css.comment}>{notice.comment}</p>

        <p className={css.price}>
          {notice.price ? `$${notice.price}` : "No price"}
        </p>

        <div className={css.btnWrap}>
          {/* ⭐ FAVORITE BUTTON */}
          <button
            type="button"
            className={css.addToFav}
            onClick={handleFavorite}
          >
            {isFav ? "Remove" : "Add to"}
            <svg className={css.icon}>
              <use href={`/icons.svg#${isFav ? "icon-trash" : "icon-fav"}`} />
            </svg>
          </button>

          <a href={`mailto:${notice.user.email}`} className={css.contactBtn}>
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}
