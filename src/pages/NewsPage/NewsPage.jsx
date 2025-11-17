import css from "./NewsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../components/Title/Title";
import {
  selectNews,
  selectNewsKeyword,
  selectNewsLoading,
  selectNewsPage,
  selectNewsTotal,
} from "../../redux/news/newsSelectors";
import { useEffect, useState } from "react";
import { fetchNews } from "../../redux/news/newsOperations";
import NewsList from "../../components/NewsList/NewsList";
import Pagination from "../../components/Pagination/Pagination";
import { setKeyword, setPage } from "../../redux/news/newsSlice";
import SearchField from "../../components/SearchField/SearchField";

export default function NewsPage() {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const keyword = useSelector(selectNewsKeyword);
  const page = useSelector(selectNewsPage);
  const total = useSelector(selectNewsTotal);

  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    setLocalValue(keyword);
  }, [keyword]);

  useEffect(() => {
    dispatch(fetchNews({ page, limit: 6, keyword: keyword || undefined }));
  }, [dispatch, page, keyword]);

  const handleSearchSubmit = () => {
    dispatch(setPage(1));
    dispatch(setKeyword(localValue.trim()));
  };

  useEffect(() => {
    if (localValue === "") {
      dispatch(setPage(1));
      dispatch(setKeyword(""));
    }
  }, [localValue, dispatch]);

  return (
    <main className="containerMain">
      <div className={css.lineWrap}>
        <Title text="News" />
        <SearchField
          value={localValue}
          onChange={setLocalValue}
          onSubmit={handleSearchSubmit}
        />
      </div>

      <NewsList items={news} />

      <Pagination
        page={page}
        total={total}
        limit={6}
        onPageChange={(p) => dispatch(setPage(p))}
      />
    </main>
  );
}
