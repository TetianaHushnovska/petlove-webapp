import { Link } from "react-router";
import Header from "../../components/Header/Header";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className="container">
      <Header />
      <div className={css.wrapper}>
        <p className={css.title}>
          4<img className={css.img} />4
        </p>

        <p className={css.text}>Ooops! This page not found :( </p>

        <Link to="/home" className={css.homeBtn}>
          To home page
        </Link>
      </div>
    </div>
  );
}
