import { useSelector } from "react-redux";
import PetsItem from "../PetsItem/PetsItem";
import css from "./PetsList.module.css";

export default function PetsList() {
  const rawPets = useSelector((state) => state.auth.user?.pets);
  const pets = Array.isArray(rawPets) ? rawPets : [];

  return (
    <ul className={css.list}>
      {pets.map((pet) => (
        <li key={pet._id} className={css.item}>
          <PetsItem pet={pet} />
        </li>
      ))}
    </ul>
  );
}
