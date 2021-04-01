import React, { Fragment, useState } from "react";
import "./stylesheets/style.css";
import { Link } from "react-router-dom";

const FuelQuote = () => {
    const [gallon, setGal] = useState("");
    const [DAddress, setDAddress] = useState("");
    const [DDate, setDDate] = useState("");
    const [Price, setPrice] = useState("");
    const [Total, setTotal] = useState(""); 

    

    const submitForm = async e  => {
        e.preventDefault();
        try{
            const user_name = JSON.parse(localStorage.getItem('username'));                                
            const body = {gallon, DAddress, DDate, Price, Total, user_name};
            const response = await fetch(`http://localhost:5000/fuelquote/${user_name}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            if (jsonData === "data added to fuel quote history"){
                alert("Quote Completed");
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
    <Fragment>
        <html lang="en">

        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title> Fuel Quote Project- Quote</title>
            <link rel="stylesheet" href="stylesheets/style.css" />
                
        </head>

        <body class = "center">
            <div>
                <h1>Fuel Quote</h1>
            </div>
            <form onSubmit = {submitForm}>
                <div>
                    <label for = "gal-id"> Gallons Requested: &emsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type= "number" id = "gal-id" name= "gallon" placeholder="Number of Gallons" style={{width: '350px'}}/>

                </div>

                <div> 
                    <label for = "delivery-id"> Delivery Address: &emsp;&emsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="text" id= "delivery-id" name= "delivery" placeholder="This address will later do in JS(get-method)" style={{width: '350px'}}/>
                </div>

                <div>
                    <label for= "delivered-date-id"> Delivery Date: &emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="date" name="delivered-date" required= "required" style={{width: '353px'}}/>
                </div>

                <div> 
                    <label for= "suggested-price-id"> Suggested Price/Gallon: </label>
                    <input type="number" id= "suggested-price-id" name= "price" placeholder="This price will later do in JS(get-method)" style={{width: '350px'}}/>
                </div>

                <div> 
                    <label for= "total-id"> Total Amount: &emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="number" id= "total-id" name= "total" placeholder="This price will later do in JS(get-method)" style={{width: '350px'}}/>
                </div>
            </form>
            <div>
                <Link to="/FuelHistory"><button type="submit" class="view-quotes">View All Quotes</button></Link>
            </div>
            <div>
                <Link to="/Dashboard"><button type="submit" class="view-quotes">Back to Dashboard</button></Link>
            </div>

        </body>
        </html>
    </Fragment>);
}

export default FuelQuote;