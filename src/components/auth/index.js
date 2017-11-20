import React from "react";
import { Link, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { bool, func, object, string } from "prop-types";

import { login } from "../../modules/actions/auth";
import Input from "./input";

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
    language: string.isRequired,
    labels: object.isRequired
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
    const state = this.state;
    const props = this.props;
    return (
      <div>
        {props.loggedIn ? <Redirect to="/backend" push /> : ""}
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <h3>{props.labels.loginPageTitle[props.language]}</h3>
            <form onSubmit={this.handleSubmit} style={{ marginBottom: "10px" }}>
              <Input
                label={props.labels.usernameLabel[props.language]}
                name="username"
                value={state.username}
                placeholder={props.labels.usernamePlaceholder[props.language]}
                disabled={props.fetching}
                onChange={this.onChange}
              />
              <Input
                label={props.labels.passwordLabel[props.language]}
                name="password"
                value={state.password}
                placeholder={props.labels.passwordPlaceholder[props.language]}
                disabled={props.fetching}
                onChange={this.onChange}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={props.fetching}
              >
                {props.labels.submitBtnLabel[props.language]}
              </button>
            </form>
            {Object.keys(props.error).length ? (
              <div className="alert alert-danger">{props.error.text}</div>
            ) : (
              ""
            )}
            {!state.valid ? (
              <div className="alert alert-danger">
                Поля формы должны быть заполнены!
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
  language: state.app.language,
  labels: state.app.labels.login
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
