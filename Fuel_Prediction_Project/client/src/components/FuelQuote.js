import React, { Fragment, useState, useEffect } from "react";
import background from "./images/theme.jpg";
import "./stylesheets/style.css";
import { Link } from "react-router-dom";

const Quote = () => {
    const [gallon, setGal] = useState("");
    const [DAddress, setDAddress] = useState("");
    const [DDate, setDDate] = useState("");
    const [Price, setPrice] = useState("");
    const [Total, setTotal] = useState("");

    var isTX = 5;
    var Suggested=0;
    var totaltest=0;
    const getaddress = async e => {
        try{
            const user_name = JSON.parse(localStorage.getItem('username')); 
            const response = await fetch(`http://localhost:5000/fuelquote_address/${user_name}`);
            const jsonData = await response.json();
            setDAddress(jsonData);
            if (jsonData.contains('TX')) {
                isTX = 1;
                alert("instate");
            } else {
                isTX = 0;
                alert("outof state");
            }
            if(isTX !== 5){
                alert("no change");
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() =>{
        getaddress();
    });
    
    //get suggested price
    const getPrice = async e => {
        try{
            var LocFac;
            var GalFactor;
            var RateFactor;
            var ComProfit = 10/100;
            if (gallon > 1000){
                GalFactor = 2/100;
            } else {
                GalFactor = 3/100;
            }
            if (isTX === 1) {
                LocFac = 2/100;
            }else {
                LocFac = 4/100;
            }
            const user_name = JSON.parse(localStorage.getItem('username')); 
            const response = await fetch(`http://localhost:5000/fuelquote_price/${user_name}`);
            const jsonData = await response.json();
            if (jsonData === "No History"){
                RateFactor = 1/100;
            }else {
                RateFactor = 0;
            }
            Suggested = 1.5 + 1.5*(LocFac - RateFactor + GalFactor + ComProfit);
            totaltest = gallon * Suggested;
            setPrice(Suggested);
            setTotal(totaltest);
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() =>{
        getPrice();
    });
    


    const submitForm = async e  => {
        e.preventDefault();
        try{
            const user_name = JSON.parse(localStorage.getItem('username'));                                
            const body ={gallon:gallon, DAddress:DAddress, DDate:DDate, Price:Price, Total:Total, user_name};
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
        <div style ={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            height: "955px"
        }}>
            <html>

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
                <form class="fuelquote-form" align="center" onSubmit = {submitForm}>
                    <div>
                        <label for = "gal-id"> Gallons Requested: &emsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type= "number" id = "gal-id" name= "gallon" placeholder="Number of Gallons" style={{width: '350px'}} class="form-control"
                        value={gallon}
                        onChange={e=>setGal(e.target.value)}/>

                    </div>

                    <div> 
                        <label for = "delivery-id"> Delivery Address: &emsp;&emsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="text" id= "delivery-id" name= "delivery" placeholder= {DAddress} style={{width: '350px'}} class="form-control"
                        value={DAddress}
                        onChange={e=>setDAddress(e.target.value)}/>
                    </div>

                    <div>
                        <label for= "delivered-date-id"> Delivery Date: &emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="date" name="delivered-date" required= "required" style={{width: '353px'}} class="form-control"
                        value={DDate}
                        onChange={e=>setDDate(e.target.value)}/>
                    </div>

                    <div> 
                        <label for= "suggested-price-id"> Suggested Price/Gallon: </label>
                        <input type="number" id= "suggested-price-id" name= "price" placeholder={Price} style={{width: '350px'}} class="form-control" readOnly
                        value={Price}
                        onChange={e=>setPrice(e.target.value)}/>
                    </div>

                    <div> 
                        <label for= "total-id"> Total Amount: &emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type="number" id= "total-id" name= "total" placeholder={Total} style={{width: '350px'}} class="form-control" readOnly
                        value={Total}
                        onChange={e=>setTotal(e.target.value)}/>
                    </div>
                    <div><button> Submit Quote</button></div>
                </form>
                <div>
                    <Link to="/FuelHistory"><button type="submit" class="view-quotes">View All Quotes</button></Link>
                </div>
                <div>
                    <Link to="/Dashboard"><button type="submit" class="view-quotes">Back to Dashboard</button></Link>
                </div>

            </body>
            </html>
        </div>
    </Fragment>);

}
export default Quote;
