import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import Spinner from "../layout/Spinner";

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;
    const {loading} = this.props;
    if (loading) return <Spinner /> ;
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">Back to search</Link>
        Hireable: {' '} {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" /> }
        <div className="card grid-2">
          <div className="all-center">
            <img src={avatar_url} className="round-img round-img-large" alt="user"/>
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>}
            <a href={html_url} className="btn btn-dark my-1">Visit Github</a>
            <ul>
              <li>
                {login && <Fragment>
                  <strong>Username:</strong> {login}
                </Fragment>}
              </li>
              <li>
                {blog && <Fragment>
                  <strong>Website:</strong> {blog}
                </Fragment>}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">
            Followers: {followers}
          </div>
          <div className="badge badge-success">
            Following: {following}
          </div>
          <div className="badge badge-white">
            Public repos: {public_repos}
          </div>
          <div className="badge badge-dark">
            Public gists: {public_gists}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default User;