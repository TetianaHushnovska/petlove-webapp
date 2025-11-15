import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectToken } from "../../redux/auth/authSelector";

export default function PrivateRoute({ children }) {
  const token = useSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
