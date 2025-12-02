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

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);

  // 🔥 1. Refresh user after reload (if token exists)
  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [token, dispatch]);

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
      </Route>
    </Routes>
  );
}

export default App;
