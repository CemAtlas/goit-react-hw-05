import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={({ isActive }) => (isActive ? css.active : "")}>
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? css.active : "")}
      >
        Movies
      </NavLink>
    </nav>
  );
}
