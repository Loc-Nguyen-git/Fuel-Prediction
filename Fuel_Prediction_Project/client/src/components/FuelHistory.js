import React, { Fragment, useEffect, useState} from "react";
import "./stylesheets/style.css";
import { Link } from "react-router-dom";

const FuelHistory = () => {
    const [fuelhistory, setUserinfo] = useState([]);
    const selectUser = async e => {   
        try {
            const user_name = JSON.parse(localStorage.getItem('username'));
            const response = await fetch(`http://localhost:5000/fuelquote-history/${user_name}`);
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
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title> Fuel Quote Project- History</title>
                <link rel="stylesheet" href="stylesheets/style.css" />
            </head>
            <body>
                <h1> </h1>
                <div>
                    <div>
                        <h2 class="center">Fuel Quote History</h2>
                        <div align="center">
                        <table styles="width: 1055px; height: 100px; margin-bottom: 100px;" class="center">
                            <thead>
                            <tr>                
                                <th>Gallons Requested</th>
                                <th>Delivery Address</th>
                                <th>Delivery Date</th>
                                <th>Suggested Price</th>
                                <th>Total Amount Due (dollars)</th>
                            </tr>
                            </thead>

                            <tbody>
                                {fuelhistory.map(fuelquote =>(
                                    <tr>
                                        <td>{fuelquote.Gallons_Requested}</td>
                                        <td>{fuelquote.Delivery_Address}</td>
                                        <td>{fuelquote.Delivery_Date}</td>
                                        <td>{fuelquote.Suggested_Price}</td>
                                        <td>{fuelquote.Total_Amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table></div>
                        
                        <form class="center">
                            <div><Link to="/FuelQuote"><button>Get a Quote</button></Link></div>
                            <div><Link to="/Dashboard"><button>Dashboard</button></Link></div>
                        </form>
                    </div>
                </div>
            </body>
        </html>
    </Fragment>)};


export default FuelHistory;