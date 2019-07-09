import React, {useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../constants";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search users
  const searchUsers =  async (text) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };
  //get user
  const getUser = async (username) => {
    setLoading();

    const res = await  axios.get(
      `https://api.github.com/users/${username}?${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                                                 ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };
  //get user

  //clear users
  const clearUsers = () => dispatch({type: CLEAR_USERS});

  //set loading
  const setLoading = () => dispatch({type: SET_LOADING});

  return <GithubContext.Provider
    value = {{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser
    }}>
    {props.children}
  </GithubContext.Provider>
};

export default GithubState;
