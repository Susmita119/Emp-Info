import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { Button } from 'reactstrap';
import ReactSearchBox from "react-search-box";
import SearchField from "react-search-field";
import Login from "../../Containers/Login/index.js";
import SignIn from "../../Containers/SignIn/index.js";
import CustomButton from "../../Components/Shared/Button/index.js";


const ToList = props => (
    <tr>
      <td>{props.count}</td>
      <td>{props.roles.rollId}</td>
      <td>{props.roles.rollName}</td>
    </tr>
  );
class Roles extends Component {

    constructor(props){
    super(props);

    this.state = {
        
        rollName : "",
        
        roles: [],
  
    
      };
    
    
      console.log("constructor",this.state.roles)

    }

    async componentDidMount() {
        const response = await axios.get(
          "http://10.0.2.252:5000/userRoll/getAllUserRoll"
        );
    
        const roles = response.data;
    
        this.setState({
            roles: roles
        });
    
        console.log("all roles", this.state.roles);
        
      }

    

    callList() {
        let count = 0;
        return this.state.roles.map(function(currentTodo, i) {
          count = count + 1;
          return <ToList roles={currentTodo} key={i} count={count} />;
        });
      }
    
      handlClicked = e =>{

        e.preventDefault();
        const createRole = {
            rollName: this.state.rollName,
        };

        console.log("createRole",createRole);
        axios.post("http://10.0.2.252:5000/userRoll/createRole",createRole,{
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

        console.log("handlClicked");
      };

      handleChange = event =>{

        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });

        console.log(event.target.name,":",event.target.value);

      }


  render(){
  return (
    <Router> 
    <div className="Roles">
    <h2>Welcome to Roles</h2>
    <Table striped>
            <thead>
                <label>Role Name: </label>
                <input type="text" name="rollName" onChange={this.handleChange}></input>
                <Button color="primary" onClick={this.handlClicked}> Add </Button>
              <tr>
                <th>Sr No</th>
                <th>Role Id</th>
                <th>Role Name</th>
              </tr>
            </thead>
            <tbody>{this.callList()}</tbody>
          </Table>    
         
    </div>
    </Router>
  );
  }
}

export default Roles;