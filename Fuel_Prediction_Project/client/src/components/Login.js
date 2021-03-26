import React, { Fragment, useState } from "react";
import background from "./images/theme.jpg";
import logo from "./images/logo.png"
import { Link } from "react-router-dom";

import "./stylesheets/style.css";

const Login = () => {
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = async e  => {
        e.preventDefault();
        try{
            const body = {user_name, password};
            const response = await fetch("http://localhost:5000/signin",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            if (jsonData === "signing in"){
                window.location = "/Profile";
            }
            else {
                alert("Invalid user or password");
            }
            
        } catch (err) {
            console.error(err.message);
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
                <div class="login-page">
                    <h2 class="center">Login</h2>
                    <div class="center">
                        <form class = "login-form" onSubmit={submitForm}>
                            <div class = "form-user">
                                <input type="text" class="form-control" name="username" placeholder="Username" required="required"
                                value = {user_name}
                                onChange={e=>setUsername(e.target.value)}/>
                            </div>
                            <div class = "form-password">
                                <input type="password" class="form-control" name="password" placeholder="Password" required="required"
                                value = {password}
                                onChange={e=>setPassword(e.target.value)}/> 
                            </div>
                            <button class="btn-submit-fn" type="submit" name="Sign-in" onclick = "signin()" >Sign in</button>
                        </form>
                        <p class="Not-Register">Don't have an account? <Link to="/Register"><u><b>   Register here!   </b></u></Link></p>
                    
                </div>
                </div>
                </body>
            </html>
        </div>
    </Fragment>)};

export default Login;