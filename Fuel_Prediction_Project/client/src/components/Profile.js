import React, { Fragment, useState } from "react";
import background from "./images/theme.jpg";
import "./stylesheets/style.css";
import { Link } from "react-router-dom";

const Profile = () => {
    
    const [full_name, setName] = useState("");
    const [address1, setAd] = useState("");
    const [address2, setAdd] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    const submitForm = async e  => {
        e.preventDefault();
        try{
            const user_name = JSON.parse(localStorage.getItem('username'));
            const body = {full_name, address1, address2, city, state, zip, user_name};
            const response = await fetch(`http://localhost:5000/profile/${user_name}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            }); 
            const jsonData = await response.json();
            if (jsonData === "profile was updated"){
                alert("Registered as " + user_name);
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
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title> Fuel Quote Project - Profile Management </title>
                <link rel="stylesheet" href="stylesheets/style.css" />
            </head>
            <body>
                <h1 className="center"> Profile Management </h1>
                <div> 
                    <div>
                        <h2 class="center"> Edit Information Here</h2>
                        <div>
                            <form class="profile-form" align="center" onSubmit={submitForm}>
                                <div>
                                    <label for="full-name-id">Full Name:&nbsp;&nbsp;</label>
                                    <input style={{width: '350px'}} id= "full-name-id" name= "full-name"type="text" class="form-control" placeholder="Full Name (maximum 50 characters, required)" maxlength= "50" required="required"
                                    value={full_name}
                                    onChange={e=>setName(e.target.value)}/>
                                    
                                </div>
                                <div>
                                    <label for="address1-id">Address #1:&nbsp;</label>
                                    <input style={{width: '350px'}} id= "address1-id" name= "adress1" type="text" class="form-control" placeholder="Address 1 (maximum 100 characters, required)" maxlength= "100" required="required"
                                    value={address1}
                                    onChange={e=>setAd(e.target.value)}/>
                                    
                                </div>
                                <div>
                                    <label for="address2-id">Address #2:&nbsp;</label>
                                    <input style={{width: '350px'}} id= "address2-id" name= "adress2" type="text" class="form-control" placeholder="Address 2 (maximum 100 characters, optional)" maxlength= "100"
                                    value={address2}
                                    onChange={e=>setAdd(e.target.value)}/>
                                    
                                </div>
                                <div> 
                                    <label for="city-id">City:&emsp;&emsp;&emsp;&nbsp;&nbsp;</label>
                                    <input style={{width: '350px'}} id= "city-id" name= "city" type="text" class="form-control" placeholder="City (maximum 100 characters, required)" maxlength= "100" required="required"
                                    value={city}
                                    onChange={e=>setCity(e.target.value)}/>
                                    
                                </div>
                                <div>
                                    <label for="state-id">State:&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    <select name="state" id="state-id" value={state} onChange={e=>setState(e.target.value)}>
                                        <option>Select your state (required)</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                    
                                </div>
                                <div>
                                    <label for="zip-id">Zipcode:&emsp;&nbsp;&nbsp;</label>
                                    <input style={{width: '350px'}} id ="zip-id" name= "zip" type="text" class="form-control" placeholder="Zipcode (9 characters, at least 5 character code required)" pattern="[0-9]*" maxlength="9" minlength="5" size = "10" required="required"
                                    value={zip}
                                    onChange={e=>setZip(e.target.value)}/>
                                </div>
                                <div><button>
                                    Submit
                                </button></div>
                            </form>
                            
                            <div><form class="center">
                            <Link to="/FuelQuote"><button>Get a Quote</button></Link>
                            <div>
                            <Link to="/Dashboard"><button type="submit" class="view-quotes">Back to Dashboard</button></Link>
                            </div>
                            </form></div>      
                    </div>
                </div>
                </div>
            </body> 
        </html>
        </div>
    </Fragment>);
}

export default Profile;