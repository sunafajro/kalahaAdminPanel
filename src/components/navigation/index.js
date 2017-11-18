import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../../modules/actions/auth";

class Navigation extends React.Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.logout();
  };
  render() {
    const props = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/backend">
            Кала-ха
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
              <li
                className={
                  props.location.pathname === "/backend/game"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link to={"/backend/game"} className="nav-link">
                  {props.labels.gameLinkTitle[props.language]}
                </Link>
              </li>
              {props.loggedIn ? (
                <li
                  className={
                    props.location.pathname === "/backend/categories"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to={"/backend/categories"} className="nav-link">
                    {props.labels.categoriesLinkTitle[props.language]}
                  </Link>
                </li>
              ) : (
                ""
              )}
              {props.loggedIn ? (
                <li
                  className={
                    props.location.pathname === "/backend/words"
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to={"/backend/words"} className="nav-link">
                    {props.labels.wordsLinkTitle[props.language]}
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li
                className={
                  props.location.pathname === "/backend/login"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                {props.loggedIn ? (
                  <a
                    href="/backend/logout"
                    className="nav-link"
                    onClick={this.handleLogout}
                  >
                    {props.labels.logoutLinkTitle[props.language]} ({props.user.username})
                  </a>
                ) : (
                  <Link to={"/backend/login"} className="nav-link">
                    {props.labels.loginLinkTitle[props.language]}
                  </Link>
                )}
              </li>
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
  language: state.app.language,
  labels: state.app.labels.navigation
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
