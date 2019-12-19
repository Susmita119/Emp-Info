import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  browserHistory,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import '../style.css'
import SignIn from '../../Containers/SignIn/index.js'
import Admin from '../../Containers/Admin/index.js'
import Navigation from '../../Containers/Navigation.js'
import CustomButton from  '../../Components/Shared/Button/index.js'
import CustomInput from '../../Components/Shared/Input/index.js'
import { Button } from 'reactstrap';
        
const ToList = props => (
  <tr>
    <td>{props.count}</td>
    <td>{props.users.userName}</td>
    <td>{props.users.password}</td>
    </tr>
);


 class Login extends React.Component{
constructor(props){
super(props);
const { history } = this.props;
this.state = {
  
  userName: "",
  password: "",
  
  token:"",
    
isAdmin : false
};

console.log("in constructor");

}


handleChange= event =>{
  event.preventDefault();
  this.setState(
      {
       [event.target.name] : event.target.value 
      }

  );
     
};


handleClicked = event =>{
  event.preventDefault();
  const loggedUser ={
    userName : this.state.userName,
    password : this.state.password
  };

  if(loggedUser.userName==="admin" && loggedUser.password==="1111" )
  {
    const history  = this.props;
    console.log("history",history);
    this.props.history.push('/admin');
    //browserHistory.replace('/admin');

  }
  axios.post("http://10.0.2.252:5000/users/signIn",loggedUser,{
    headers: {
      "Content-Type": "application/json"
    }

  })
  .then(Response =>{
    axios.defaults.headers.common['Authorization']=`Bearer ${Response.data.accessToken}`;
    this.setState({
      token:Response.data.accessToken,
      isAdmin:true});
    console.log("In res",Response);
     
    
           
  })
  .catch(error => {
    console.log(error.response);
  });
  
  console.log("loggedUser",loggedUser);
   
  
};

setAuthorToken=event=>{
  event.preventDefault();

  axios.get("http://10.0.2.252:5000/users/getUsersByAuthType?authType=all")
  .then(response=>{
    console.log(response);
  })
  .catch(error => {
    console.log(error.response);
  });
  console.log("In setAuthor function",this.state.token);
  };



render(){
  const { history } = this.props;
  console.log("render history",history);
return(
  <Router>
<div className="Login">
        <div>
        <Navigation/>
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
          <label >Password : </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={this.handleChange}
          />
          <br></br>
          <button type="submit" onClick={this.setAuthorToken}>Show data</button><Link to="/admin">Admin Link</Link>
          <br></br>
          <button type="submit" onClick={this.handleClicked} >Login</button> <Link to="/signIn">Create a account</Link>
          <switch>
            <Route exact path="/signIn" component={SignIn}></Route> 
            <Route exact path="/admin" component={Admin}></Route>
          </switch>
                    
          </form>
        </div>

</div>
</Router>


);

}

}

export default Login;


