import React from "react";
import { func, object, string } from "prop-types";

LanguageSwitcher.propTypes = {
  language: string.isRequired,
  inactiveLanguage: string.isRequired,
  Translations: object.isRequired,
  changeAppLanguage: func.isRequired
};

export default function LanguageSwitcher({
  inactiveLanguage,
  language,
  Translations,
  changeAppLanguage
}) {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarLangs"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          style={{ width: "16px", height: "12px" }}
          src={"/files/images/site/" + language + ".png"}
          alt={language}
        /> {Translations.languageName[language]}
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a
          href="#"
          className="dropdown-item"
          onClick={e => {
            e.preventDefault();
            changeAppLanguage(inactiveLanguage);
          }}
        >
          <img
            style={{ width: "16px", height: "12px" }}
            src={"/files/images/site/" + inactiveLanguage + ".png"}
            alt={inactiveLanguage}
          /> {Translations.languageName[inactiveLanguage]}
        </a>
      </div>
    </li>
  );
}
