import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { bool, func, object, string } from "prop-types";

import { changeAppLanguage } from "../../modules/actions/app";
import { logout } from "../../modules/actions/auth";
import { Translations } from "../../translations/navigation";
import MainMenu from "./MainMenu";
import LoginLogout from "./LoginLogout";
import LanguageSwitcher from "./LanguageSwitcher";

class Navigation extends React.Component {
  static propTypes = {
    loggedIn: bool.isRequired,
    user: object.isRequired,
    language: string.isRequired,
    location: object.isRequired,
    changeAppLanguage: func.isRequired,
    logout: func.isRequired
  };

  render() {
    const {
      changeAppLanguage,
      language,
      location,
      loggedIn,
      logout,
      user
    } = this.props;
    const inactiveLanguage = language === "cv" ? "ru" : "cv";
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/files/images/site/logo.png" alt="Кала-ха" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              {loggedIn ? (
                <MainMenu language={language} location={location} Translations={Translations} />
              ) : (
                ""
              )}
              <LanguageSwitcher
                inactiveLanguage={inactiveLanguage}
                language={language}
                Translations={Translations}
                changeAppLanguage={changeAppLanguage}
              />
              <LoginLogout
                language={language}
                loggedIn={loggedIn}
                location={location}
                Translations={Translations}
                user={user}
                logout={logout}
              />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  user: state.app.user,
  language: state.app.language
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeAppLanguage,
      logout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
