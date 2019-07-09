import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER
} from "../constants";

export default (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading:false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    default:
      return state;
  }
}