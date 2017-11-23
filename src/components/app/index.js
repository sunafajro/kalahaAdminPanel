import React from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { bool, func, string } from "prop-types";

import { getState } from "../../modules/actions/app";
import Navigation from "../navigation";
import Game from "../game";
import Auth from "../auth";
import Categories from "../categories";
import Words from "../words";
import { Translations } from "../../translations/app";

class App extends React.Component {
  static propTypes = {
    appLoaded: bool.isRequired,
    fetching: bool.isRequired,
    loggedIn: bool.isRequired,
    language: string.isRequired,
    getState: func.isRequired
  };

  componentDidMount() {
    this.props.getState();
  }

  render() {
    let { appLoaded, fetching, language, location, loggedIn } = this.props;
    return (
      <div>
        {!appLoaded ? (
          <div className="alert alert-warning">{ Translations.appLoadingProccess[language] }</div>
        ) : (
          <div>
            { !loggedIn &&
              location.pathname !== "/login" ? (
              <Redirect to="/login" />
            ) : (
              ""
            )}
            {!fetching ? (
              <div>
                <Navigation location={location} />
                <Switch>
                  <Route exact path="/login" component={Auth} />
                  <Route
                    exact
                    path="/categories"
                    component={Categories}
                  />
                  <Route exact path="/words" component={Words} />
                  <Route path="/" component={Game} />
                </Switch>
              </div>
            ) : (
              <div className="alert alert-warning">
                { Translations.appDataLoadingProccess[language] }
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appLoaded: state.app.appLoaded,
  fetching: state.app.fetching,
  loggedIn: state.app.loggedIn,
  language: state.app.language
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getState
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
