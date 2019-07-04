import React, {Component} from "react";
import axios from "axios";

import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users"

import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false
  };
  async componentDidMount() {
    this.setState({
      loading: true
    });

    const res = await axios.get(
      `https://api.github.com/users?${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                                        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      users: res.data,
      loading: false
    });
  }

  render() {
    const {users, loading} = this.state;
    return (
      <div className="App">
        <Navbar title="Github Search" icon="fab fa-github"/>
        <div className="container">
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
