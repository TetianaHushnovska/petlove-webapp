import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPets,
  fetchCategories,
  fetchGenders,
  fetchTypes,
} from "../../redux/pets/petsOperations";

import { fetchAvailableCities } from "../../redux/locations/locationsOperations";

import NoticesFilters from "../../components/NoticesFilters/NoticesFilters";

import {
  selectPetsCategory,
  selectPetsGender,
  selectPetsItems,
  selectPetsLocation,
  selectPetsPage,
  selectPetsSearch,
  selectPetsSort,
  selectPetsTotalPages,
  selectPetsType,
} from "../../redux/pets/petsSelectors";
import Title from "../../components/Title/Title";
import NoticesList from "../../components/NoticesList/NoticesList";
import Pagination from "../../components/Pagination/Pagination";
import { setPage } from "../../redux/pets/petsSlice";

export default function NoticesPage() {
  const dispatch = useDispatch();

  const items = useSelector(selectPetsItems);
  const page = useSelector(selectPetsPage);
  const totalPages = useSelector(selectPetsTotalPages);

  const search = useSelector(selectPetsSearch);
  const category = useSelector(selectPetsCategory);
  const gender = useSelector(selectPetsGender);
  const type = useSelector(selectPetsType);
  const location = useSelector(selectPetsLocation);
  const sort = useSelector(selectPetsSort);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchGenders());
    dispatch(fetchTypes());
    dispatch(fetchAvailableCities());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch, page, search, category, gender, type, location, sort]);

  return (
    <main className="containerMain">
      <Title text="Find your favorite pet" />
      <NoticesFilters />
      <NoticesList items={items} />
      <Pagination
        page={page}
        total={totalPages}
        onPageChange={(p) => dispatch(setPage(p))}
      />
    </main>
  );
}
