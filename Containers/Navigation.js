import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signIn">SignIn</NavLink>
          <NavLink to="/admin">Admin</NavLink>
           </div>
    );
}
 
export default Navigation;