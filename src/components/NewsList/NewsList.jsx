import { useSelector } from "react-redux";
import NewsItems from "../NewsItem/NewsItem";
import css from "./NewsList.module.css";
import { selectNewsLoading } from "../../redux/news/newsSelectors";
import Loader from "../Loader/Loader";

export default function NewsList({ items }) {
  const isLoading = useSelector(selectNewsLoading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ul className={css.listWrap}>
      {items.map((item) => (
        <li key={item._id}>
          <NewsItems item={item} />
        </li>
      ))}
    </ul>
  );
}
