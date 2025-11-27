import { useState, useRef, useEffect } from "react";
import css from "./Dropdown.module.css";

export default function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className={css.wrapper} ref={ref}>
      <button
        type="button"
        className={`${css.button} ${open ? css.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value || label}
        <span className={css.arrow} />
      </button>

      {open && (
        <div className={css.menu}>
          <div className={css.showAll} onClick={() => onChange("")}>
            Show all
          </div>

          <ul className={css.list}>
            {options.map((opt) => (
              <li key={opt} className={css.item} onClick={() => onChange(opt)}>
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
