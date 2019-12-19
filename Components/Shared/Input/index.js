import React from 'react';


/*class CustomInput extends React.Component{
render(){
return(
<input type='text'/>

);


}



}*/

const CustomInput = (props) =>{
return (
    
<form onSubmit={props.getUser}>
    <h1>Hi...!!! in CustomInput {props.getUser} </h1>
    <input type="text" name="username"></input>
    <button type="submit">Submit</button>
</form>


);




} 

export default CustomInput;