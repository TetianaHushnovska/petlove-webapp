import { useSelector } from "react-redux";
// import PetsItem from "../PetsItem/PetsItem";
import css from "./PetsList.module.css";

export default function PetsList() {
  const pets = useSelector((state) => state.auth.user?.pets ?? []);

  return (
    <div className={css.list}>
      {pets.length > 0 && (
        <ul className={css.list}>
          {pets.map((pet) => (
            // <PetsItem key={pet._id} pet={pet} />
            <li>{pet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
