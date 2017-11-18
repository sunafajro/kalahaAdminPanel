import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from '../../modules/actions/auth';

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
                    Выход ({props.user.username})
                  </a>
                ) : (
                  <Link to={"/backend/login"} className="nav-link">
                    Вход
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
  user: state.app.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
