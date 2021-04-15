import React, { Fragment, useState, useEffect} from "react";
import background from "./images/theme.jpg";
import "./stylesheets/style.css";
import { Link } from "react-router-dom";

const History = () => {
    const [history, setUsers] = useState([]);
    const selectQuote = async e => {   
        try {
            const user_name = JSON.parse(localStorage.getItem('username'));
            const response = await fetch(`http://localhost:5000/fuelquote-history/${user_name}`);
            const jsonData = await response.json();
            setUsers(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() =>{
        selectQuote();
    },[]);

    return (
    <Fragment>
        <div style ={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            height: "955px"
        }}>
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
                                {history.map(fuelquote =>(
                                <tr>
                                    <td>{fuelquote.gallons_requested}</td>
                                    <td>{fuelquote.delivery_address}</td>
                                    <td>{fuelquote.delivery_date}</td>
                                    <td>{fuelquote.suggested_price}</td>
                                    <td>{fuelquote.total_amount}</td>
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
        </div>
    </Fragment>);

}
export default History;