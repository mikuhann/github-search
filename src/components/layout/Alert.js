import React from 'react';
import PropTypes from "prop-types";

const Alert = ({alert, closeAlert}) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"/>{` ${alert.msg}`}
        <i className="fas fa-times-circle alert-close" onClick={closeAlert}/>
      </div>
    )
  );
};

Alert.propTypes = {
  alert: PropTypes.object,
  closeAlert: PropTypes.func.isRequired
};

export default Alert;
