import { useSelector } from "react-redux";
import NoticesItem from "../NoticesItem/NoticesItem";
import css from "./NoticesList.module.css";
import { selectPetsLoading } from "../../redux/pets/petsSelectors";
import NotFound from "../NotFound/NotFound";

export default function NoticesList({ items }) {
  const loading = useSelector(selectPetsLoading);
  console.log(
    "🔑 KEYS CHECK:",
    items.map((i) => i._id)
  );
  if (!loading && items.length === 0) {
    return <NotFound />;
  }
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
