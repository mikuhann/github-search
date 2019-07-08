import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

import "./App.css";

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers =  async (text) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
  };

  const getUser = async (username) => {
    setLoading(true);

    const res = await  axios.get(
      `https://api.github.com/users/${username}?${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };



  const showAlert = (msg, type) => {
    setAlert({msg, type});
  };

  useEffect(() => {
    let alertTimeout = setInterval(() => setAlert(null), 3000);
    return () => {
      clearTimeout(alertTimeout);
    };
  }, []);

  const closeAlert = () => {
    setAlert(null);
  };
  return (
    <Router>
      <div className="App">
        <Navbar title="Github Search" icon="fab fa-github"/>
        <div className="container">
          <Alert
            alert={alert}
            closeAlert={closeAlert}/>
            <Switch>
              <Route
                exact path="/"
                render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0}
                    setAlert={showAlert}
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
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  repos={repos}
                  getUserRepos={getUserRepos} />)} />
            </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
