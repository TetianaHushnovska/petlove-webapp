import NoticesItem from "../NoticesItem/NoticesItem";
import css from "./NoticesList.module.css";

export default function NoticesList({ items }) {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li key={item._id}>
          <NoticesItem item={item} />
        </li>
      ))}
    </ul>
  );
}
