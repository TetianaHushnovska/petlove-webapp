import CircularProgress from "@mui/material/CircularProgress";
import css from "./Loader.module.css";

export default function Loader({ size = 80, backdrop = true }) {
  return (
    <div className={`${css.overlay} ${backdrop ? css.backdrop : ""}`}>
      <CircularProgress size={size} />
    </div>
  );
}
