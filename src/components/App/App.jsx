import { Navigate, Route, Routes, useLocation } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import HomePage from "../../pages/HomePage/HomePage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import NewsPage from "../../pages/NewsPage/NewsPage";
import FriendsPage from "../../pages/FriendsPage/FriendsPage";
import NoticesPage from "../../pages/NoticesPage/NoticesPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { Layout } from "../Layout/Layout";

import { refreshUser } from "../../redux/auth/authOperations";
import { fetchFavorites } from "../../redux/favorites/favoritesOperations";
import AddPetPage from "../../pages/AddPetPage/AddPetPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // 1️⃣ Refresh user after reload
  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [token, dispatch]);

  // 2️⃣ Load favorites AFTER user is refreshed
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavorites());
    }
  }, [isLoggedIn, dispatch]);

  // Background color logic
  useEffect(() => {
    if (location.pathname === "/register" || location.pathname === "/login") {
      document.body.classList.add("white-bg");
      document.body.classList.remove("gray-bg");
    } else {
      document.body.classList.add("gray-bg");
      document.body.classList.remove("white-bg");
    }
  }, [location]);

  if (isRefreshing) return null;

  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />

          <Route path="home" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="notices" element={<NoticesPage />} />

          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            path="add-pet"
            element={
              <PrivateRoute>
                <AddPetPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
