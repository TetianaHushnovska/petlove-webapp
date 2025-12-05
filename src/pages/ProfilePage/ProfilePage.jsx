import css from "./ProfilePage.module.css";
import UserCard from "../../components/UserCard/UserCard";
import MyNotices from "../../components/MyNotices/MyNotices";

export default function ProfilePage() {
  return (
    <main className="container">
      <div className={css.wrap}>
        <UserCard />
        <MyNotices />
      </div>
    </main>
  );
}
