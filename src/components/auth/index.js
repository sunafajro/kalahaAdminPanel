import React from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { bool, object, string } from "prop-types";

import { login } from "../../modules/actions/auth";
import Input from "./input";
import { Translations } from "../../translations/auth";

class Auth extends React.Component {
  state = {
    username: "",
    password: "",
    valid: true
  };

  static propTypes = {
    loggedIn: bool.isRequired,
    fetching: bool.isRequired,
    error: object.isRequired,
    language: string.isRequired
  };

  /**
   * @param { Object } e
   */
  handleSubmit = e => {
    e.preventDefault();
    let valid = true;
    const username = this.state.username;
    const password = this.state.password;

    if (!username || !password) {
      valid = false;
      this.setState({ valid });
    } else {
      this.props.login({ username, password });
    }
  };

  /**
   * @param { string } key
   * @param { string } value
   */
  onChange = (key, value) => {
    this.setState({ [key]: value });
  };

  render() {
    const { password, username, valid } = this.state;
    const { error, fetching, language, loggedIn } = this.props;
    return (
      <div>
        {loggedIn ? <Redirect to="/" push /> : ""}
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <h3>{Translations.loginPageTitle[language]}</h3>
            <form onSubmit={this.handleSubmit} style={{ marginBottom: "10px" }}>
              <Input
                label={Translations.usernameLabel[language]}
                name="username"
                value={username}
                placeholder={Translations.usernamePlaceholder[language]}
                disabled={fetching}
                onChange={this.onChange}
              />
              <Input
                label={Translations.passwordLabel[language]}
                name="password"
                value={password}
                placeholder={Translations.passwordPlaceholder[language]}
                disabled={fetching}
                onChange={this.onChange}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={fetching}
              >
                {Translations.submitBtnLabel[language]}
              </button>
            </form>
            {Object.keys(error).length ? (
              <div className="alert alert-danger">{error.text}</div>
            ) : (
              ""
            )}
            {!valid ? (
              <div className="alert alert-danger">
                {Translations.errorEmptyAlert[language]}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.app.loggedIn,
  fetching: state.auth.fetching,
  error: state.auth.error,
  language: state.app.language
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
