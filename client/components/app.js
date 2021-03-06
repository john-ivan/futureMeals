import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from './login';
import Signup from './signup';
import Profile from './profile';
import RecipeDisplay from './recipeDisplay';
import { createBrowserHistory } from 'history';

class App extends Component {
  constructor(props, context) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleRecipeRender = this.handleRecipeRender.bind(this);
    this.uhh = context;
    this.state = {
      0: true,
      1: false,
      2: false,
      3: false,
      username: '',
      password: '',
      isAuthenticated: false,
    };
  }

  handleSignUpClick() {
    this.setState({ 0: false, 1: true, 2: false, 3: false })
  }

  handleProfileClick() {
    this.setState({ 0: false, 1: false, 2: false, 3: true })
  }

  handleRecipeRender() {
    this.setState({ 0: false, 1: false, 2: true, 3: false })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSignUpSubmit(e) {
    axios.post('/signup', { username: this.state.username, password: this.state.password })
      .then(response => {
        if (response.status === 200)
          this.setState({ isAuthenticated: true });
      })
  }

  handleLoginSubmit(e) {
    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then((response) => {
        if (response.status === 200)
          this.setState({ isAuthenticated: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <Login
                handleSignUpClick={this.handleSignUpClick}
                handleChange={this.handleChange}
                handleLoginSubmit={this.handleLoginSubmit}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <Signup
                handleChange={this.handleChange}
                handleSignUpSubmit={this.handleSignUpSubmit}
                isAuthenticated={this.state.isAuthenticated}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              this.state.isAuthenticated ?
                <RecipeDisplay
                  username={this.state.username}
                  handleProfileClick={this.handleProfileClick}
                  isAuthenticated={this.state.isAuthenticated}
                /> :
                <p>NOT AUTHORIZED</p>
            )}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              this.state.isAuthenticated ?
                <Profile
                  username={this.state.username}
                  isAuthenticated={this.state.isAuthenticated}
                /> :
                <p>NOT AUTHORIZED</p>
            )}
          />
        </div>
      </Router>
    );
    /*if (this.state[0] === true) {
      return (
        <div>
          <Login handleSignUpClick={this.handleSignUpClick} handleChange={this.handleChange} handleLoginSubmit={this.handleLoginSubmit} />
        </div>
      )
    } else if (this.state[1] === true) {
      return (
        <div>
          <Signup handleChange={this.handleChange} handleSignUpSubmit={this.handleSignUpSubmit} />
        </div>
      )
    } else if (this.state[2] === true) {
      return (
        <div>
          <RecipeDisplay username={this.state.username} handleProfileClick={this.handleProfileClick} />
        </div>
      )
    } else if (this.state[3] === true) {
      return (
        <div>
          <Profile username={this.state.username} />
        </div>
      )
    }*/
  }
}

// App.contextTypes = {
//   router: React.PropType.object
// }

module.exports = App;