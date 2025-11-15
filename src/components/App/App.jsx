import { Navigate, Route, Routes, useLocation } from "react-router";
import HomePage from "../../pages/HomePage/HomePage";
import { Layout } from "../Layout/Layout";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import { useEffect } from "react";
import "./App.css";
import LoginPage from "../../pages/LoginPage/LoginPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/register" || location.pathname === "/login") {
      document.body.classList.add("white-bg");
      document.body.classList.remove("gray-bg");
    } else {
      document.body.classList.add("gray-bg");
      document.body.classList.remove("white-bg");
    }
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirect from "/" → "/home" */}
        <Route index element={<Navigate to="/home" replace />} />

        {/* Pages */}
        <Route path="home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="news" element={<NewsPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="friends" element={<FriendsPage />} /> */}

        {/* Private routes */}
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
