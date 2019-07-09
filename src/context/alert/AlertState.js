import React, {useReducer} from 'react';
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import {
  SET_ALERT,
  REMOVE_ALERT
} from "../constants";

const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  let alertTimeout;

  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: {msg, type}
    });
    alertTimeout = setTimeout(() => dispatch({type: REMOVE_ALERT}), 3000);
  };

  const closeAlert = () => {
    dispatch({type: REMOVE_ALERT});
    clearTimeout(alertTimeout);
  };

  return <AlertContext.Provider
    value={{
      alert: state,
      setAlert,
      closeAlert
    }}>
    {props.children}
  </AlertContext.Provider>
};

export default AlertState;