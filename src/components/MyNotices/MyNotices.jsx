import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import css from "./MyNotices.module.css";

import NoticesList from "../NoticesList/NoticesList";
import Pagination from "../Pagination/Pagination";

import {
  selectFavorites,
  selectViewed,
  selectActiveTab,
  selectFavoritesLoading,
} from "../../redux/favorites/favoritesSelectors";

import { setActiveTab } from "../../redux/favorites/favoritesSlice";
import { fetchFavorites } from "../../redux/favorites/favoritesOperations";
import Loader from "../Loader/Loader";

export default function MyNotices() {
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavorites);
  const viewed = useSelector(selectViewed);
  const activeTab = useSelector(selectActiveTab);
  const loading = useSelector(selectFavoritesLoading);
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const rawItems = activeTab === "favorites" ? favorites : viewed;
  const totalPages = Math.ceil(rawItems.length / limit) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * limit;
    return rawItems.slice(start, start + limit);
  }, [rawItems, page]);

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
    setPage(1);
  };

  return (
    <div className={css.wrapper}>
      {/* TABS */}
      <div className={css.tabs}>
        <button
          className={`${css.tab} ${
            activeTab === "favorites" ? css.active : ""
          }`}
          onClick={() => handleTabChange("favorites")}
        >
          My favorites pets
        </button>

        <button
          className={`${css.tab} ${activeTab === "viewed" ? css.active : ""}`}
          onClick={() => handleTabChange("viewed")}
        >
          Viewed
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <Loader />
      ) : (
        <NoticesList items={items} compact isViewed={activeTab === "viewed"} />
      )}

      {/* PAGINATION */}
      {!loading && rawItems.length > 0 && (
        <Pagination page={page} total={totalPages} onPageChange={setPage} />
      )}

      {/* EMPTY MESSAGE */}
      {!loading && rawItems.length === 0 && (
        <p className={css.notice}>
          Oops,{" "}
          <span className={css.span}>looks like there aren't any furries</span>{" "}
          on our adorable page yet. Do not worry! View your pets on the "find
          your favorite pet" page and add them to your favorites.
        </p>
      )}
    </div>
  );
}
