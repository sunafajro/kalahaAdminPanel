import React from "react";
import { Link } from "react-router-dom";
import { bool, func, object, string } from "prop-types";

LoginLogout.propTypes = {
  language: string.isRequired,
  loggedIn: bool.isRequired,
  location: object.isRequired,
  Translations: object.isRequired,
  user: object.isRequired,
  logout: func.isRequired
};

export default function LoginLogout({
  language,
  loggedIn,
  location,
  Translations,
  user,
  logout
}) {
  return (
    <li
      className={
        location.pathname === "/login" ? "nav-item active" : "nav-item"
      }
    >
      {loggedIn ? (
        <a
          href="/logout"
          className="nav-link"
          onClick={e => {
            e.preventDefault();
            logout();
          }}
        >
          {Translations.logoutLinkTitle[language]} ({user.username})
        </a>
      ) : (
        <Link to={"/login"} className="nav-link">
          {Translations.loginLinkTitle[language]}
        </Link>
      )}
    </li>
  );
}
