import React, { Fragment } from "react";
import "./stylesheets/style.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
    
    //const user_name = JSON.parse(localStorage.getItem('username'));
    //const user_name = "Moderna";
    let dashboard = []

    const setUserinfo = ({data}) => {
        dashboard = data;
    }
    const displayUserinfo = () => {
        const {UserTable} = document.querySelector('#table-modifier');
        let userHTML = " ";
        dashboard.map(profileInfo => (
            userHTML =
                `<tr>
                    <th>${profileInfo.full_name}</th>
                    <th>${profileInfo.address1}</th>
                    <th>${profileInfo.address2}</th>  
                    <th>${profileInfo.city}</th> 
                    <th>${profileInfo.state}</th> 
                    <th>${profileInfo.zip}</th>
                </tr>`
        ));
        UserTable.innerHTML = userHTML;
    }
    const selectUser = async e => {
        e.preventDefault();    
        try {
            const user_name = JSON.parse(localStorage.getItem('username'));
            const response = await fetch(`http://localhost:5000/profile/${user_name}`);
            const jsonData = await response.json();
    
            setUserinfo(jsonData);
            displayUserinfo();
        } catch (err) {
            console.log(err.message);
        }
    }
    

    
    return (
    <Fragment>
        <html>
            <head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title> Fuel Quote Project - Profile Management </title>
                <link rel="stylesheet" href="stylesheets/style.css" />
            </head>
            <body>
                <h1 className="center"> Profile Management </h1>
                <div> 
                    <div>
                        <h2 class="center">User Information</h2>
                        <table className="table-users" id="user-info" styles="width: 1055px; height: 100px; margin-bottom: 100px;" onClick ={selectUser} >
                            <thead>
                                <tr>
                                    <th>Full Name </th>
                                    
                                    <th>Address 1</th>
                                    <th>Address 2</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>ZipCode</th>
                                </tr>
                            </thead>
    
                            <tbody id="table-modifier">
                            </tbody>
                        </table>
                        <div><form class="left">
                            <Link to="/Profile"><button>Edit</button></Link>
                        </form></div> 
                        <div><form class="center">
                            <Link to="/FuelQuote"><button>Get a Quote</button></Link>
                        </form></div>  

                        
                    </div>
                </div>
            </body> 
        </html>
    </Fragment>);
}

export default Dashboard;