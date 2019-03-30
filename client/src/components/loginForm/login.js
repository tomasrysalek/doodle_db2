import React from 'react';
import TextField from '@material-ui/core/TextField';

class LoginForm extends React.Component{
    render(){
        return(
            <form action="localhost:4433/test" method="get">
                <TextField id="email" label="Email"  type="textfield"></TextField>
                <TextField id="password" label="Password"  type="password"></TextField>
                <input type="submit" value="submit"></input>
            </form>
    )};
}

export default LoginForm;