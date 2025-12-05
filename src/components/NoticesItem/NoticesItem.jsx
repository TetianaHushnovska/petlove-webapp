import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import css from "./NoticesItem.module.css";

import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import { selectFavorites } from "../../redux/favorites/favoritesSelectors";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favorites/favoritesOperations";

import { formatDate, safeValue } from "../../utils/formatValue";

import ModalAttention from "../ModalAttention/ModalAttention";
import ModalNotice from "../ModalNotice/ModalNotice";
import CongratsModal from "../CongratsModal/CongratsModal";

export default function NoticesItem({
  item,
  compact = false,
  isViewed = false,
}) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavorites);

  const isFav = favorites.some((f) => f._id === item._id);

  const [showAttention, setShowAttention] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const handleLearnMore = () => {
    if (!isLoggedIn) setShowAttention(true);
    else setShowNotice(true);
  };

  const handleFavorite = () => {
    if (!isLoggedIn) {
      setShowAttention(true);
      return;
    }

    if (isFav) {
      dispatch(removeFromFavorites(item._id));
    } else {
      dispatch(addToFavorites(item._id));

      if (favorites.length === 0 && !localStorage.getItem("congratsShown")) {
        setShowCongrats(true);
        localStorage.setItem("congratsShown", "true");
      }
    }
  };

  return (
    <div className={`${css.card} ${compact ? css.compact : ""}`}>
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
        <button
          className={`${css.moreBtn} ${isViewed ? css.fullWidth : ""}`}
          onClick={handleLearnMore}
        >
          Learn more
        </button>

        {!isViewed && (
          <button className={css.favBtn} onClick={handleFavorite}>
            <svg className={css.icon}>
              <use href={`/icons.svg#${isFav ? "icon-trash" : "icon-fav"}`} />
            </svg>
          </button>
        )}
      </div>

      {showAttention && (
        <ModalAttention onClose={() => setShowAttention(false)} />
      )}
      {isLoggedIn && showNotice && (
        <ModalNotice id={item._id} onClose={() => setShowNotice(false)} />
      )}

      {showCongrats && <CongratsModal onClose={() => setShowCongrats(false)} />}
    </div>
  );
}
