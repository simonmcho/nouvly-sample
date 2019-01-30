import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearProfile } from './actions/profileActions';
import history from './utils/history';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar.js';
import Landing from './components/layout/Landing.js';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import Footer from './components/layout/Footer.js';
import Dashboard from './components/dashboard';
import CreateProfile from './components/create-profile';
import EditProfile from './components/edit-profile';
import AddExperience from './components/add-credentials/add-experience';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken); // Set auth token header auth
  const decoded = jwt_decode(localStorage.jwtToken); // Decode token and get user info and expiry
  store.dispatch(setCurrentUser(decoded)); // Set user and isAuthenticated

  // Check for expired token
  const currentTime = Date.now() / 1000;

  // If token is expired, log out user, clear profile, and redirect to login page
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser()); 
    store.dispatch(clearProfile()); 
    window.location.href = '/login'; 
  }
}

class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/dashboard" 
                  component={Dashboard} 
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/create-profile" 
                  component={CreateProfile} 
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/edit-profile" 
                  component={EditProfile} 
                />
              </Switch>
              <Switch>
                <PrivateRoute 
                  exact 
                  path="/add-experience" 
                  component={AddExperience} 
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
