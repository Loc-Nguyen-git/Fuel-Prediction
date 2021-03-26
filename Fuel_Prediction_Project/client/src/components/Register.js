import React, { Fragment, useState } from "react";
import background from "./images/theme.jpg";
import logo from "./images/logo.png"
import { Link } from "react-router-dom";

import "./stylesheets/style.css";

const Register = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const password = document.getElementById("password");
    const [confirmed_password, setCPassword] = useState("");
    //const confirmed_password = document.getElementById("confirmed-password");
    

    const submitForm = async e  => {
        e.preventDefault();
        if (confirmed_password !== password){
            alert("Confirm password not match");
        } else{
            try{                                
                const body = {user_name, password};
                const response = await fetch("http://localhost:5000/register",{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                const jsonData = await response.json();
                if (jsonData === "existed username"){
                    alert("User name is in used. Pick another one");
                    window.location = "/Register";
                }
                if (jsonData === "user registered"){
                    window.location = "/";
                }
            } catch (err) {
                console.error(err.message);
            }
        }
        
    }

    return (
    <Fragment>
        <div style ={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            height: "955px"
        }}>
            <html lang="en">
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title> Fuel Quote Project- Login</title>
                <link rel="stylesheet" href="stylesheets/style.css" />
            </head>
            <img src={logo} alt=""/>
            <body>
            <div class="register-page">
                <h2 class="center">New User</h2>
                <div class="center">
                    <form class = "register-form" onSubmit={submitForm}>
                        <div class = "register-form-user">
                            <input type="text" class="form-control" name="username" placeholder="Username" required="required" 
                            value = {user_name}
                            onChange={e=>setUsername(e.target.value)}/>
                        </div>
                        <div class = "register-form-password">
                            <input type="password" class="form-control" id= "password" name="password" placeholder="Input Password" required="required"
                            value = {password}
                            onChange={e=>setPassword(e.target.value)}/> 
                            
                        </div>
                        <div class = "register-form-confirm-password">
                            <input type="password" class="form-control" id= "confirmed-password" name="confirmed-password" placeholder="Confirm Password" required="required"
                            value = {confirmed_password}
                            onChange={e=>setCPassword(e.target.value)}/>
                            
                        </div>
                        <div><button type="submit" class="Sign-In">Create</button></div>
                    </form>
                    <p class="Registered">Already have an account? <Link to="/"><u><b>   Login here!   </b></u></Link></p>
                </div>
                </div>
                </body>
            </html>
        </div>
    </Fragment>)};

export default Register;