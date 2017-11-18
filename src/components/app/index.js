import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getState } from '../../modules/actions/app';
import Game from '../game';
import Auth from '../auth';
import Categories from '../categories';

class App extends React.Component {
  componentDidMount () {
    this.props.getState();
  }

  render () {
    let props = this.props;
    return (
      <div>
        { !this.props.loggedIn && this.props.location.pathname !== '/backend/login' ? <Redirect to='/backend/login' /> : '' }
        { props.fetchingState ? <div className="alert alert-warning">Загружаем данные приложения...</div> : '' }
        { !props.fetchingState ?
          <Switch>
            <Route exact path='/backend/login' component={ Auth }/>
            <Route exact path='/backend/categories' component={ Categories }/>
            <Route path='/' component={ Game }/>
          </Switch>
          : '' }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fething: state.app.fething,
  loggedIn: state.app.loggedIn
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getState
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
