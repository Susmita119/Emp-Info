import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import ReactSearchBox from "react-search-box";
import SearchField from "react-search-field";
import Login from "../../Containers/Login/index.js";
import SignIn from "../../Containers/SignIn/index.js";
import Roles from "../../Containers/Roles/index.js";
import CustomButton from "../../Components/Shared/Button/index.js";

const ToList = props => (
  <tr>
    <td>{props.count}</td>
    <td>{props.users.userId}</td>
    <td>{props.users.userName}</td>
    <td>{props.users.emailId}</td>
    <td>{props.users.mobileNo}</td>
    <td>{props.users.authorize}</td>
    <td>{props.users.userRoll && props.users.userRoll.rollName}</td>
    <td>{<CustomButton users={props.users} onClickApprove={props.onClickApprove}/>}</td>
  </tr>
);

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      access: [
        { id: 1, role: "All" },
        { id: 2, role: "Authorized" },
        { id: 3, role: "UnAuthorized" }
      ],

      selectedFilter: 1,
      userAuthId : "" ,
      userAuth : ""
    };
    console.log("currentTodocurrentTodo constructor state: ",this.state.userAuthId,":",this.state.userAuth);
  }

  async componentDidMount() {
    const response = await axios.get(
      "http://10.0.2.252:5000/users/getUsersByAuthType?authType=all"
    );

    const users = response.data;

    this.setState({
      users: users
    });

    console.log("all users", this.state.users);
    //console.log("this.state.users.authorize",this.state.users.authorize.value);
  }

  onClickApprove = currentTodo => {
      const updateAuth = {
      userAuth: currentTodo.authorize,
      userAuthId: currentTodo.userId
      
    };
    console.log("updateAuth",updateAuth);
    axios
    .post("http://10.0.2.252:5000/users/changeAuthorizeStatus", updateAuth, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error.response);
    });

    console.log("currentTodocurrentTodo state: ",this.state.userAuthId,":",this.state.userAuth);
    console.log("currentTodocurrentTodo: ", currentTodo.authorize,":",currentTodo.userId)
  };

  callList() {
    let count = 0;
    let usersList = this.state.users;
    const selectedFilter = this.state.selectedFilter;

    if (selectedFilter === "Y") {
      usersList = usersList.filter(x => x.authorize === "Y");
    } else if (selectedFilter === "N") {
      usersList = usersList.filter(x => x.authorize === "N");
    } else if (selectedFilter === "All") {
      usersList = usersList;
    }

    // do not change
    return usersList.map((currentTodo, i) => {
      count = count + 1;
      //console.log("currentTodo: ", currentTodo)
      return (
        <ToList
          users={currentTodo}
          key={i}
          count={count}
          onClickApprove={this.onClickApprove}
        />
      );
    });
  }

  handleChange = event => {
    switch (event.target.value) {
      case "2":
        this.setState({ selectedFilter: "Y" });
        break;
      case "3":
        this.setState({ selectedFilter: "N" });
        break;
      default:
        this.setState({ selectedFilter: "All" });
    }
  };

  render() {
    
    return (
      <Router>
        <div className="Admin">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/"} className="nav-link">
                  Users
                </Link>
              </li>
              <li>
                <Link to={"/signIn"} className="nav-link">
                  Create User
                </Link>
              </li>
              <li>
                <Link to={"/roles"} className="nav-link">
                  Roles
                </Link>
              </li>
              <li>
                <Link to={"/login"} className="nav-link">
                  Approve
                </Link>
              </li>
              <li>
                <Link to={"/login"} className="nav-link">
                  Personal Information
                </Link>
              </li>
              <li>
                <Link to={"/login"} className="nav-link">
                  Change User table
                </Link>
              </li>
            </ul>
          </nav>
          <switch>
            <Route path="/login" component={Login} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/roles" component={Roles} />
          </switch>
          <br></br>
          <label>Show Users: </label>
          <select
            type="select"
            name="showUsers"
            placeholder="--select--"
            onChange={this.handleChange}
          >
            {this.state.access.map(x => (
              <option value={x.id}>{x.role}</option>
            ))}
          </select>
          <br></br>
          <br></br>

          <ReactSearchBox
            placeholder="Placeholder"
            value="userName"
            users={this.users}
            callback={record => console.log(record)}
          />

          <SearchField
            placeholder="Search item"
            //onChange={onChange}
          />

          <br></br>
          <br></br>

          <Table striped>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>userId</th>
                <th>userName</th>
                <th>emailId</th>
                <th>mobileNo</th>
                <th>authorize</th>
                <th>rollName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{this.callList()}</tbody>
          </Table>
        </div>
      </Router>
    );
  }
}

export default Admin;
