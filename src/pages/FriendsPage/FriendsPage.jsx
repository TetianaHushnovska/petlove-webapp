import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title/Title";
import { selectFriends } from "../../redux/friends/friendsSelectors";
import FriendsList from "../../components/FriendsList/FriendsList";
import { useEffect } from "react";
import { fetchFriends } from "../../redux/friends/friendsOperations";

export default function FriendsPage() {
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, []);

  return (
    <main className="containerMain">
      <Title text="Our friedns" />
      <FriendsList items={friends} />
    </main>
  );
}
