import React from "react";
import { useLocation, Link } from "react-router-dom"
import headerLogo from '../images/header/header__logo.svg';


function Header({ email, logOut, loggedIn }) {
    const location = useLocation();
    const path = (location.pathname === "/sign-in") ? "/sign-up" : "/sign-in";
    const LinkName = (location.pathname === "/sign-in") ? "Регистрация" : "Войти";

    return (
        <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип проекта Место"/>
        {
            loggedIn
              ? (
                <div className="header__accaunt-container">
                    <p className="header__accaunt-email">{email}</p>
                    <Link className="header__accaunt-link" to="/sign-in" onClick={logOut}>Выйти</Link>
                </div>
              )
              : (
                <Link className="header__accaunt-link" to={path}> {LinkName}</Link>
              )
        }
    </header>
    )
}

export default Header;