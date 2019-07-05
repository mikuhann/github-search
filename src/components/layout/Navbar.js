import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const Navbar = ({title, icon}) => {
  return (
    <nav className="navbar bg-primary">
      <h1><i className={icon}/>{' '}{title}</h1>
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-home"/>{' '} Home
          </Link>
        </li>
        <li>
          <Link to="/about">
            <i className="fas fa-question-circle"/>{' '}About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Search",
  icon: "fab fa-github"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
