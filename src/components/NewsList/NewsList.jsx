import NewsItems from "../NewsItem/NewsItem";
import css from "./NewsList.module.css";

export default function NewsList({ items }) {
  return (
    <ul className={css.listWrap}>
      {items.map((item) => (
        <li key={item.id}>
          <NewsItems item={item} />
        </li>
      ))}
    </ul>
  );
}
