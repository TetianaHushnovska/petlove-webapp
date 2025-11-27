import { formatDate, safeValue } from "../../utils/formatValue";
import css from "./NoticesItem.module.css";

export default function NoticesItem({ item }) {
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
        <button type="button" className={css.moreBtn}>
          Learn more
        </button>

        <button type="button" className={css.favBtn}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-fav" />
          </svg>
        </button>
      </div>
    </div>
  );
}
