import React, {useState, useEffect, Fragment} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

import GithubState from "./context/github/GithubState";

import "./App.css";

const App = () => {
  const [alert, setAlert] = useState(null);

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
    <GithubState>
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
                      setAlert={showAlert}
                    />
                    <Users />
                  </Fragment>
                )} />
              <Route exact path="/about" component={About}/>
              <Route exact path="/user/:login" component={User} />)} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
