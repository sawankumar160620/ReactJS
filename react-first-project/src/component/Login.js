import React from 'react'
import {Button} from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify'
import './Login.css';
const Login = () =>
{
    const btnHandler = () =>
    {
        //toast("this is my first message");
        toast.success('Done',{
            position: "top-center"
        });
    };
    const person = (username,password) =>
    {
        this.username = username;
        this.password = password;
    }
    const Submit = (event) =>
    {
        console.log(event.target.value)
        //document.getElementById('password').value
        //const father=person(document.getElementById('constusername').value,document.getElementById('password').value)
    }
    return(
        <div id='Login'>
            <div id="form-controller">
                <input placeholder="username" id='username'></input>
                <input placeholder="password" id='password'></input>
                <br></br>
            <Button color="warning" outline onClick={btnHandler}>Submit</Button>
            </div>
            
        </div>
    )
}
export default Login