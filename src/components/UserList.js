import { Component } from "react";
import { Row, Col } from "antd";
import "./UserList.css";
import User from "./User";

class UserList extends Component {
  state = {
    users: [],
  };

  fetchEmployees() {
    this.setState(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((result) => this.setState({ users: result }));
    });
  }

  componentDidMount() {
    setTimeout(() => this.fetchEmployees(), 3000);
  }

  delete = (id) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((entry) => entry.id !== id),
    }));
  };

  update = (id, data) => {
    this.setState((prevState) => ({
      users: prevState.users.map((entry) => {
        if (entry.id === id) return { ...entry, ...data };
        return entry;
      }),
    }));
  };

  render() {
    const { users } = this.state;

    if (users.length === 0) {
      return (
        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div>
        </div>
      );
    }

    return (
      <Row>
        {users.map((user) => (
          <Col xs={24} sm={24} md={8} lg={8} xl={6} key={user.id}>
            <User
              user={user}
              deleteUser={this.delete}
              updateUser={this.update}
            ></User>
          </Col>
        ))}
      </Row>
    );
  }
}

export default UserList;
