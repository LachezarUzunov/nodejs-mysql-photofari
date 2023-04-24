import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./MainNavigation.module.css";
import { logout } from "../../features/auth/authSlice";
//import { reset } from "../../features/auth/authSlice";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    // dispatch(reset);
    navigate("/");
  };
  return (
    <nav className={classes.nav}>
      <ul className={classes.nav_links}>
        <li>
          <Link to="/">Начало</Link>
        </li>
        <li>
          <Link to="/photos">Снимки</Link>
        </li>
        {user && (
          <li>
            <Link to="/add">Добави снимка</Link>
          </li>
        )}
        <li>
          <Link to="/profiles">Потребители</Link>
        </li>
        <li>
          <Link to="/contacts">Контакти</Link>
        </li>
        {/* {!user && (
          <li>
            <Link to="/login">Влез</Link>
          </li>
        )} */}
        {user && (
          <li>
            <Link to="/" onClick={onLogout}>
              Изход
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
