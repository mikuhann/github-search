import React, {Component} from 'react';
import UserItem from "./UserItem";

class Users extends Component {
  state = {
    users: [
      {
        "login": "mojombo",
        "id": 1,
        "avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
        "html_url": "https://github.com/mojombo",
      },
      {
        "login": "defunkt",
        "id": 2,
        "avatar_url": "https://avatars0.githubusercontent.com/u/2?v=4",
        "html_url": "https://github.com/defunkt",
      },
      {
        "login": "pjhyett",
        "id": 3,
        "avatar_url": "https://avatars0.githubusercontent.com/u/3?v=4",
        "html_url": "https://github.com/pjhyett",
      }
    ]
  };
  render() {
    const {users} = this.state;
    return (
      <div className="grid-3">
        {users.map((user) => {
          return (
            <UserItem key ={user.id} user={user} />
          )
        })}
      </div>
    );
  }
}

export default Users;