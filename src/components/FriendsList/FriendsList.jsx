import { useSelector } from "react-redux";
import FriendsItem from "../FriendsItem/FriendsItem";
import css from "./FriendsList.module.css";
import { selectFriendsIsLoading } from "../../redux/friends/friendsSelectors";
import Loader from "../Loader/Loader";

export default function FriendsList({ items }) {
  const isLoading = useSelector(selectFriendsIsLoading);

  return (
    <>
      {isLoading && <Loader />}

      <ul className={css.listWrap}>
        {items.map((item) => (
          <li key={item.id}>
            <FriendsItem item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
