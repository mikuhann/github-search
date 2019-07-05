import React, {Component} from "react";
import axios from "axios";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";

import "./App.css";

class App extends Component {
  state = {
    users: [],
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
    const {users, loading, alert} = this.state;
    return (
      <div className="App">
        <Navbar title="Github Search" icon="fab fa-github"/>
        <div className="container">
          <Alert
            alert={alert}
            closeAlert={this.closeAlert}/>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0}
            setAlert={this.setAlert}
            />
          <Users
            users={users}
            loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
