import React from "react";
import { Link, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login, updateLoginForm } from "../../modules/actions/auth";

const LANG = 'ru';

class Auth extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    
    let loginForm = { ...this.props.loginForm };
    const username = this.props.loginForm.username;
    const password = this.props.loginForm.password;

    if (!username || !password) {
      loginForm.valid = false;
      this.props.updateLoginForm(loginForm);
    } else {
      loginForm.valid = true;
      this.props.updateLoginForm(loginForm);
      this.props.login(username, password);
    }
  };
  render() {
    const props = this.props;
    return (
      <div>
        {props.loggedIn ? <Redirect to="/backend/game" push /> : ""}
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <h3>{ props.labels.login.loginPageTitle[LANG] }</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="usernameInput">
                  {props.labels.login.usernameLabel[LANG]}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usernameInput"
                  placeholder={props.labels.login.usernamePlaceholder[LANG]}
                  value={props.loginForm.username}
                  onChange={e => {
                    let loginForm = { ...props.loginForm };
                    loginForm.username = e.target.value;
                    this.props.updateLoginForm(loginForm)
                  }}
                  disabled={props.fetching}
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordInput">
                  {props.labels.login.passwordLabel[LANG]}
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder={props.labels.login.passwordPlaceholder[LANG]}
                  value={props.loginForm.password}
                  onChange={e => {
                    let loginForm = { ...props.loginForm };
                    loginForm.password = e.target.value;
                    this.props.updateLoginForm(loginForm)
                  }}
                  disabled={props.fetching}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={props.fetching}
              >
                {props.labels.login.submitBtnLabel[LANG]}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginForm: state.auth.loginForm,
  loggedIn: state.app.loggedIn,
  fetching: state.auth.fetching,
  error: state.auth.error,
  labels: state.app.labels
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateLoginForm,
      login
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
