import { useSelector } from "react-redux";
import NoticesItem from "../NoticesItem/NoticesItem";
import css from "./NoticesList.module.css";
import { selectPetsLoading } from "../../redux/pets/petsSelectors";
import Loader from "../Loader/Loader";

export default function NoticesList({
  items = [],
  compact = false,
  isViewed = false,
}) {
  const isLoading = useSelector(selectPetsLoading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ul className={`${css.list} ${compact ? css.compactList : ""}`}>
      {items.map((item) => (
        <li key={item._id}>
          <NoticesItem item={item} compact={compact} isViewed={isViewed} />
        </li>
      ))}
    </ul>
  );
}
