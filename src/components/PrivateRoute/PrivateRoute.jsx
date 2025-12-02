import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectToken } from "../../redux/auth/authSelectors";

export default function PrivateRoute({ children }) {
  const token = useSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
