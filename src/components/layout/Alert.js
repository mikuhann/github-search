import React, {useContext} from 'react';
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const {alert, closeAlert} = alertContext;
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"/>{` ${alert.msg}`}
        <i className="fas fa-times-circle alert-close" onClick={closeAlert}/>
      </div>
    )
  );
};

export default Alert;
