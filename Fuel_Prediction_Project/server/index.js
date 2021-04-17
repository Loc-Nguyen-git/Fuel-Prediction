const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');

//middleware
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

//routes
//registers user
app.post("/register", async(req,res) =>
{
  try{
      const {user_name} = req.body;
      const {password} = req.body;
      console.log(user_name);

      const compare_username = await pool.query("SELECT * FROM Users WHERE user_name = $1",[user_name]);
      if (compare_username.rows.length == 0){
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const register = await pool.query("INSERT INTO Users VALUES ($1,$2)",
        [user_name, bcryptPassword]);
        console.log(register);
  
        const defaultProfile = await pool.query("INSERT INTO profileInfo (user_name, full_name, address1, address2, city, state, zip) VALUES ($1, ' ' , ' ', NULL, NULL, NULL, NULL)",
        [user_name]);
        console.log(defaultProfile);

        res.json("user registered");
      }
      else {
        res.json("existed username")
      }

      

  }catch(err){
    console.log(err.message);
  }
});

//sign in
app.post('/signin', async(req,res) => {
    const {user_name} = req.body;
    const {password} = req.body;
    try{
        const signIn = await pool.query("SELECT * FROM Users WHERE user_name = $1",[user_name]);
        console.log(signIn.rows);
        if(signIn.rows.length === 0){
            console.log("Invalid Credentials");
            return res.status(401).json("Invalid Credentials");
        }
        /*const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(bcryptPassword);
        console.log(signIn.rows[0].password);*/
        const validPassword = await bcrypt.compare(password, signIn.rows[0].password);
        console.log(validPassword);
        if(!validPassword){
            console.log("Invalid Credentials");
            return res.status(401).json("Invalid Credentials");
        }
        console.log(signIn.rows);
        res.json("signing in");
    }catch(err){
        console.log(err.message);
    }
});
//get fuelquote history
app.get('/fuelquote-history/:user_name', async(req,res) => {
    var name = req.params.user_name;
    console.log(name);
    try{        
        const getFuelQ = await pool.query("SELECT gallons_requested, delivery_address, delivery_date, suggested_price, total_amount FROM fuelquote WHERE user_name = $1", [name]);
        console.log(getFuelQ.rows[0].gallons_requested);
        res.json(getFuelQ.rows);
    }catch(err){
        console.log(err.message);
    }
});
//get profile data
app.get('/profile/:user_name', async(req,res) => {
    var name = req.params.user_name;
    //console.log(name);
    try{
        
        const getProfile = await pool.query("SELECT full_name, address1, address2, city, state, zip FROM profileInfo WHERE user_name = $1", [name]);
        console.log(getProfile.rows[0].full_name);
        res.json(getProfile.rows);
        //res.body=getProfile.rows;
        /*
        console.log("1");
        res.json(res.body);
        console.log(res.body);*/
    }catch(err){
        console.log(err.message);
    }
});

//update profile
app.post("/profile/:user_name", async(req,res) => {
    try{
        var name = req.params.user_name;
        const {full_name}=req.body;
        const {address1}=req.body;
        const {address2}=req.body;
        const {city}=req.body;
        const {state}=req.body;
        const {zip}=req.body;
        console.log(full_name,address1,city,state);
        const updateProfile = await pool.query("UPDATE profileInfo SET full_name=$1, address1=$2, address2=$3, city=$4, state=$5, zip=$6 WHERE user_name=$7",[full_name,address1,address2,city,state,zip,name]);
        console.log(updateProfile);
        res.json("profile was updated");
    }catch(err){
        console.log(err.message);
    }
});

//update fuelquote 
app.post('/fuelquote/:user_name', async(req,res) => {
    try{
        var name = req.params.user_name;
        const {gallon}=req.body;
        const {DAddress}=req.body;
        const {DDate}=req.body;
        const {Price}=req.body;
        const {Total}=req.body;
        console.log(name,gallon,DAddress,DDate,Price,Total);
	
        const updateFuelQ = await pool.query("INSERT INTO fuelquote (user_name, Gallons_Requested, Delivery_Address, Delivery_Date, Suggested_Price, Total_Amount) VALUES ($1, $2, $3, $4, $5, $6)"
        ,[name,gallon,DAddress,DDate,Price,Total]);
        console.log(updateFuelQ);
        res.json("data added to fuel quote history");
    }catch(err){
        console.log(err.message);
    }
});
// get address of the user to put in delivery address
app.get("/fuelquote_address/:user_name", async(req,res) => {
    try{
        var name = req.params.user_name;
        const getAddress = await pool.query("SELECT address1, address2, city, state, zip FROM profileinfo WHERE user_name = $1",
        [name]);
        console.log(getAddress.rows);
        res.json(getAddress.rows[0].address1+ " " +getAddress.rows[0].address2+ ", "+ getAddress.rows[0].city+ ", "+getAddress.rows[0].state+ " "+getAddress.rows[0].zip);
    }catch(err){
        console.log(err.message);
    }
});


// get Price of the quote to put in Suggested_Price
app.get('/fuelquote_price/:user_name', async(req,res) => {
    try{
        var name = req.params.user_name;
        const getHistory = await pool.query("SELECT * FROM fuelquote WHERE user_name = $1",[name]);
        if (getHistory.rows.length === 0){
            res.json("No History");
        }else {
            res.json("Existed History");
        }
        
    }catch(err){
        console.log(err.message);
    }
});

module.exports = app.listen(5000, ()=> {
    console.log("Server has started on port 5000")
});
