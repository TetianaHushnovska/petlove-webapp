import { useState, useRef, useEffect } from "react";
import css from "./Dropdown.module.css";

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  variant = "default",
  showAll = true,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (opt) => {
    onChange(opt);
    setOpen(false);
  };

  return (
    <div className={`${css.wrapper} ${css[variant] || ""}`} ref={ref}>
      <button
        type="button"
        className={`
    ${css.button} 
    ${open ? css.open : ""} 
    ${value ? css.active : ""}
  `}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value || label}
        <span className={css.arrow} />
      </button>

      {open && (
        <div className={css.menu}>
          {showAll && (
            <div className={css.showAll} onClick={() => handleSelect("")}>
              Show all
            </div>
          )}

          <ul className={css.list}>
            {options.map((opt) => (
              <li
                key={opt}
                className={`${css.item} ${opt === value ? css.selected : ""}`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
