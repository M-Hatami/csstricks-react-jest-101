import React, { Component } from "react";
import axios from "axios";
import Profile from "./Profile";

class App extends Component {
  state = {
    users: [],
    isLoading: true,
    error: null,
  };

  getUsers() {
    axios
      .get("https://randomuser.me/api/?results=6")
      .then((response) =>
        response.data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          image: `${user.picture.thumbnail}`,
        }))
      )
      .then((users) => {
        this.setState({
          users,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getUsers();
  }
  render() {
    const { isLoading, users } = this.state;
    const REACT_VERSION = React.version;
    return (
      <React.Fragment>
        <div className="container">
          <h2>CSSTricks Tests</h2>
          <div className="row">
            {!isLoading ? (
              users.map((user) => {
                return <Profile key={user.username} user={user} />;
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <footer>
          <div style={{ textAlign: "center" }}>
            React version: {REACT_VERSION}
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
