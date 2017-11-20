import React from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { bool, func } from "prop-types";

import { getState } from "../../modules/actions/app";
import Navigation from "../navigation";
import Game from "../game";
import Auth from "../auth";
import Categories from "../categories";
import Words from "../words";

class App extends React.Component {
  static propTypes = {
    appLoaded: bool.isRequired,
    fetching: bool.isRequired,
    loggedIn: bool.isRequired,
    getState: func.isRequired
  };

  componentDidMount() {
    this.props.getState();
  }

  render() {
    let props = this.props;
    return (
      <div>
        {!props.appLoaded ? (
          <div className="alert alert-warning">Загружаем приложение...</div>
        ) : (
          <div>
            {!props.loggedIn &&
            (props.location.pathname === "/backend/categories" ||
              props.location.pathname === "/backend/words") ? (
              <Redirect to="/backend/login" />
            ) : (
              ""
            )}
            {!props.fetching ? (
              <div>
                <Navigation location={this.props.location} />
                <Switch>
                  <Route exact path="/backend/login" component={Auth} />
                  <Route
                    exact
                    path="/backend/categories"
                    component={Categories}
                  />
                  <Route exact path="/backend/words" component={Words} />
                  <Route path="/" component={Game} />
                </Switch>
              </div>
            ) : (
              <div className="alert alert-warning">
                Загружаем данные приложения...
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
  loggedIn: state.app.loggedIn
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getState
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
