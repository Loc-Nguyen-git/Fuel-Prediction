const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

//middleware
app.use(cors())
app.use(express.json());

//routes
//registers user
app.post("/register", async(req,res) =>
{
  try{
      const {user_name} = req.body;
      const {password} = req.body;

      const compare_username = await pool.query("SELECT * FROM Users WHERE user_name = $1",[user_name]);
      if (compare_username.rows.length == 0){
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const register = await pool.query("INSERT INTO Users VALUES ($1,$2)",
        [user_name, bcryptPassword]);
        console.log(register);
  
        const defaultProfile = await pool.query("INSERT INTO profileInfo (user_name, full_name, address1, address2, city, state, zip) VALUES ($1, ' ' , ' ', NULL, NULL, NULL, NULL)",
        [user_name]);
        console.log(defaultProfile);
  
        const defaultFuelQuote = await pool.query("INSERT INTO fuelquote (user_name, Gallons_Requested, Delivery_Address, Delivery_Date, Suggested_Price, Total_Amount) VALUES ($1, NULL, NULL, NULL, NULL, NULL)",
        [user_name]);
        console.log(defaultFuelQuote);
        res.json("user registered");
      }
      else {
          console.log("existed username");
          res.json("existed username");
      }

      

  }catch(err){
    console.log(err.message);
  }
})

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
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(bcryptPassword);
        console.log(signIn.rows[0].password);
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
})

//get profile data
app.get('/profile/:user_name', async(req,res) => {
    var name = req.params.user_name;
    console.log(name);
    try{
        
        const getProfile = await pool.query("SELECT full_name, address1, address2, city, state, zip FROM profileInfo WHERE user_name = $1", [name]);
        console.log("1");
        console.log(getProfile);
        res.json(getProfile.rows);
    }catch(err){
        console.log(err.message);
    }
})

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

        const updateProfile = await pool.query("UPDATE profileInfo SET full_name=$1, address1=$2, address2=$3, city=$4, state=$5, zip=$6 WHERE user_name=$7",[full_name,address1,address2,city,state,zip,name]);
        console.log(updateProfile);
        res.json("profile was updated");
    }catch(err){
        console.log(err.message);
    }
});

//get fuelquote history
app.get('/fuelquote/:user_name', async(req,res) => {
    try{
        const {user_name} = req.params;
        const getFuelQ = await pool.query("SELECT * FROM fuelquote WHERE user_name = $1",
        [user_name]);
        console.log(getFuelQ);
        res.json("getting fuel quote history data");
    }catch(err){
        console.log(err.message);
    }
})

//update fuelquote 
app.post("/fuelquote/:user_name", async(req,res) => {
    try{
        const {user_name}=req.params;
        const {Gallons_Requested}=req.body;
        const {Delivery_Address}=req.body;
        const {Delivery_Date}=req.body;
        const {Suggested_Price}=req.body;
        const {Total_Amount}=req.body; 
	
        const updateFuelQ = await pool.query("UPDATE fuelquote SET Gallons_Requested=$1, Delivery_Address=$2, Delivery_Date=$3, Suggested_Price=$4, Total_Amount=$5 WHERE user_name=$6"
        ,[Gallons_Requested,Delivery_Address,Delivery_Date,Suggested_Price,Total_Amount,user_name]);
        console.log(updateFuelQ);
        res.json("data added to fuel quote history");
    }catch(err){
        console.log(err.message);
    }
});
// app.get () => {} : fuelquote history

app.listen(5000, ()=> {
    console.log("Server has started on port 5000")
});