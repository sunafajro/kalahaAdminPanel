import React from "react";
import { Link } from "react-router-dom";
import { object, string } from "prop-types";

MainMenu.propTypes = {
  language: string.isRequired,
  location: object.isRequired,
  Translations: object.isRequired
};

export default function MainMenu({
  language,
  location,
  Translations
}) {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {Translations.menuTitle[language]}
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarMenu">
        <Link
          to={"/game"}
          className={
            location.pathname === "/game"
              ? "dropdown-item active"
              : "dropdown-item"
          }
        >
          {Translations.gameLinkTitle[language]}
        </Link>
        <Link
          to={"/categories"}
          className={
            location.pathname === "/categories"
              ? "dropdown-item active"
              : "dropdown-item"
          }
        >
          {Translations.categoriesLinkTitle[language]}
        </Link>
        <Link
          to={"/words"}
          className={
            location.pathname === "/words"
              ? "dropdown-item active"
              : "dropdown-item"
          }
        >
          {Translations.wordsLinkTitle[language]}
        </Link>
      </div>
    </li>
  );
}
