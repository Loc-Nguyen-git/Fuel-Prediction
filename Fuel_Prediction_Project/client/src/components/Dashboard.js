import React, { Fragment, useEffect, useState} from "react";
import "./stylesheets/style.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [dashboard, setUserinfo] = useState([]);
    const selectUser = async e => {   
        try {
            const user_name = JSON.parse(localStorage.getItem('username'));
            const response = await fetch(`http://localhost:5000/profile/${user_name}`);
            const jsonData = await response.json();
            setUserinfo(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() =>{
        selectUser();
    },[]);
    
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
                <h1 className="center"> Dashboard </h1>
                <div> 
                    <div>
                        <h2 class="center">User Information</h2>
                        <div align="center">
                        <table styles="width: 1055px; height: 100px; margin-bottom: 100px;" class="center">
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
    
                            <tbody>
                                {dashboard.map(profileinfo => (
                                    <tr>
                                        <td>{profileinfo.full_name}</td>
                                        <td>{profileinfo.address1}</td>
                                        <td>{profileinfo.address2}</td>  
                                        <td>{profileinfo.city}</td> 
                                        <td>{profileinfo.state}</td> 
                                        <td>{profileinfo.zip}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table></div>
                        <div><form class="edit-profile" align = "center" >
                            <Link to="/Profile"><button>Edit Profile Information</button></Link>
                        </form></div>
                        <div> 
                            <div>
                            <form class="center">
                                <Link to="/FuelQuote"><button>Get a Quote</button></Link>
                            </form>
                            </div>
                            <div>
                            <form class="center">
                                <Link to="/FuelHistory"><button type="submit" class="view-quotes">View All Quotes</button></Link>
                            </form></div>
                            <div>
                            <form class="center">
                                <Link to="/"><button>Log Out</button></Link>
                            </form>
                            </div>
                        </div>                        
                    </div>
                </div>
            </body> 
        </html>
    </Fragment>);
}

export default Dashboard;