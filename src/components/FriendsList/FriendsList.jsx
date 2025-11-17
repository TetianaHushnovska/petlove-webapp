import FriendsItem from "../FriendsItem/FriendsItem";
import css from "./FriendsList.module.css";

export default function FriendsList({ items }) {
  return (
    <ul className={css.listWrap}>
      {items.map((item) => (
        <li key={item.id}>
          <FriendsItem item={item} />
        </li>
      ))}
    </ul>
  );
}
