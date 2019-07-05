import React from 'react';
import PropTypes from "prop-types";

const RepoItem = ({repo: {name, html_url, description}}) => {
  return (
    <div className="card">
      <h3>
        <a href={html_url}>{name}</a>
      </h3>
      <p className="text-dark">{description}</p>
    </div>
  );
};

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired
};

export default RepoItem;
