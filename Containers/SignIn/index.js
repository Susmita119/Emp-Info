import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import { IoIosBody, IoIosKey } from "react-icons/io";
import CustomButton from "../../Components/Shared/Button/index.js";
import CustomInput from "../../Components/Shared/Input/index.js";
import { Button } from "reactstrap";
import Login from '../../Containers/Login/index.js'
import { throwStatement } from "@babel/types";
//<Linkify properties={{ target: '_blank' }}>Create a account </Linkify>
//<input type="submit" value="Log In" data-test="submit" />
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailId: "",
      mobileNo: "",
      password: "",
      userName: "",
      userRoll: {
        rollId : "",
        rollName : ""
      },
      temp : [
        {id: 1, role: 'Administrator'},
        {id: 2, role: 'Operator'},
        {id: 3, role: 'Access User'}
      ],

      userRoleId :"",
      userRole:""
    };

    console.log("constructor state values",this.state);
  }

  handleClick = e => {
    e.preventDefault();
    const createUser = {
      emailId: this.state.emailId,
      mobileNo: this.state.mobileNo,
      password: this.state.password,
      userName: this.state.userName,
      userRoll: {
        rollId: this.state.userRoleId,
        rollName:this.state.userRole
      }
    };

    console.log("In create user!!:", createUser);
    axios
      .post("http://10.0.2.252:5000/users/signUp", createUser, {
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
  };

  myNewFunction = event =>{
    event.preventDefault();
    let rolee = event.target.value
            
    this.state.temp.map((x,index) => {
      if (x.role == rolee){
      console.log(rolee, "in" ,x.id);
      let id = x.id
      console.log("x.id in" ,x.id);
    this.setState({
      userRoleId : id,
      userRole : rolee 
    });  
    }
    
    });

    console.log("myNewFunction state values",this.state);
   
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });

    console.log(event.target.name,":",event.target.value);

  };



  render() {
   
    console.log("render state values",this.state);
    return (
      <Router>
      <div className="SignIn">
        <form>
          <br></br>
          <label>User Name : </label>
          <input
            type="text"
            name="userName"
            data-test="userName"
            onChange={this.handleChange}
          />
          <br></br>
          <label>Email Add : </label>
          <input type="email" name="emailId" onChange={this.handleChange} />
          <br></br>
          <label>User Role : </label>
          <select
            type="select"
            name="userRoll"
            placeholder="--select--"
            onChange={this.myNewFunction}
          >
            {
              this.state.temp.map(x => <option value={x.role}> {x.role} </option>)
            }

          </select>
          <br></br>
          <label>Password : </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={this.handleChange}
          />
          <br></br>
          <label>Mobile no : </label>
          <input
            type="text"
            name="mobileNo"
            data-test="username"
            onChange={this.handleChange}
          />
          <br></br>
          <h3>
            {" "}
            Lets go for a <IoIosBody />?{" "}
          </h3>
          <button onClick={this.handleClick}>Singn Up </button>  <Link to="/Login">I'm already a member</Link>               
         <switch>

           <Route exact path="/Login" component={Login}>

           </Route>
         </switch>
          <br></br>
        </form>
      </div>
      </Router>
    );
  }
}
export default SignIn;
