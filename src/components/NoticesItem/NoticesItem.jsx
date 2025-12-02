import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import css from "./NoticesItem.module.css";

import {
  selectIsLoggedIn,
  selectFavorites,
} from "../../redux/auth/authSelectors";
import { addFavorite, removeFavorite } from "../../redux/auth/authOperations";

import { formatDate, safeValue } from "../../utils/formatValue";

import ModalAttention from "../ModalAttention/ModalAttention";
import ModalNotice from "../ModalNotice/ModalNotice";

export default function NoticesItem({ item }) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavorites);
  const isFav = favorites.includes(item._id);

  const [showAttention, setShowAttention] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const handleLearnMore = () => {
    if (!isLoggedIn) setShowAttention(true);
    else setShowNotice(true);
  };

  const handleFavorite = () => {
    if (!isLoggedIn) {
      setShowAttention(true);
      return;
    }

    if (isFav) dispatch(removeFavorite(item._id));
    else dispatch(addFavorite(item._id));
  };

  return (
    <div className={css.card}>
      <img src={item.imgURL} alt={item.title} className={css.img} />

      <div className={css.titleWrap}>
        <p className={css.title}>{safeValue(item.title)}</p>

        <div className={css.rating}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-star" />
          </svg>
          {item.popularity}
        </div>
      </div>

      <div className={css.details}>
        <div className={css.box}>
          <p className={css.param}>Name</p>
          <p className={css.paramDetail}>{safeValue(item.name)}</p>
        </div>

        <div className={css.box}>
          <p className={css.param}>Birthday</p>
          <p className={css.paramDetail}>{formatDate(item.birthday)}</p>
        </div>

        <div className={css.box}>
          <p className={css.param}>Sex</p>
          <p className={css.paramDetail}>{safeValue(item.sex)}</p>
        </div>

        <div className={css.box}>
          <p className={css.param}>Species</p>
          <p className={css.paramDetail}>{safeValue(item.species)}</p>
        </div>

        <div className={css.box}>
          <p className={css.param}>Category</p>
          <p className={css.paramDetail}>{safeValue(item.category)}</p>
        </div>
      </div>

      <p className={css.comment}>{safeValue(item.comment, "No description")}</p>

      <p className={css.price}>{item.price ? `$${item.price}` : "No price"}</p>

      <div className={css.btnWrap}>
        <button className={css.moreBtn} onClick={handleLearnMore}>
          Learn more
        </button>

        <button className={css.favBtn} onClick={handleFavorite}>
          <svg className={css.icon}>
            <use href={`/icons.svg#${isFav ? "icon-trash" : "icon-fav"}`} />
          </svg>
        </button>
      </div>

      {showAttention && (
        <ModalAttention onClose={() => setShowAttention(false)} />
      )}

      {isLoggedIn && showNotice && (
        <ModalNotice id={item._id} onClose={() => setShowNotice(false)} />
      )}
    </div>
  );
}
