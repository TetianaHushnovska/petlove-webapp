import { Link } from "react-router";
import css from "./AddPet.module.css";

export default function AddPet() {
  return (
    <Link to="/add-pet" className={css.addPet}>
      Add pet
      <svg className={css.icon}>
        <use href="/icons.svg#icon-plus" />
      </svg>
    </Link>
  );
}
