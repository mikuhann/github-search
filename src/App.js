import React, {Component, Fragment} from "react";
import axios from "axios";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  searchUsers =  async (text) => {
    this.setState({
      loading: true
    });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      users: res.data.items,
      loading: false
    });
  };
  getUser = async (username) => {
    this.setState({
      loading: true
    });

    const res = await  axios.get(
      `https://api.github.com/users/${username}?${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      user: res.data,
      loading: false
    })
  };

  getUserRepos = async (username) => {
    this.setState({
      loading: true
    });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      repos: res.data,
      loading: false
    });
  };

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };

  alertTimeout;

  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type
      }
    });
    this.alertTimeout = setTimeout(() => this.setState({
      alert: null
    }),3000);
  };

  closeAlert = () => {
    this.setState({
      alert: null
    });
    clearTimeout(this.alertTimeout)
  };

  render() {
    const {users, loading, alert, user, repos} = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar title="Github Search" icon="fab fa-github"/>
          <div className="container">
            <Alert
              alert={alert}
              closeAlert={this.closeAlert}/>
              <Switch>
                <Route
                  exact path="/"
                  render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0}
                      setAlert={this.setAlert}
                    />
                    <Users
                      users={users}
                      loading={loading} />
                  </Fragment>
                )} />
                <Route exact path="/about" component={About}/>
                <Route exact path="/user/:login" render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    repos={repos}
                    getUserRepos={this.getUserRepos} />)} />
              </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
