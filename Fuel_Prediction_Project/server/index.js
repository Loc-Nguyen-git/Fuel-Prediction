const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json()); //req.body

app.get('/signin/:username/:password', async(req,res) => {
    username = req.params.username;
    password = req.params.password;
    try {
      const template = "SELECT COUNT(*) FROM User WHERE password = $1 AND user_name = $2"
    
      const searchUser = await pool.query(template,[password],[username]);
      console.log(searchUser);
      res.json(searchUser); 
    } catch (err) {
      console.log(err.message);
    }
  })

//adds default profile information
app.post("/profile", async(req,res) =>
{
  try{
      const defaultProfile = await pool.query("INSERT INTO profileInfo (full_name, address1, address2, city, state, zip) VALUES (NULL, NULL, NULL, NULL, NULL)")

      console.log(defaultProfile);
      res.json("default profile created");
  }catch(err){
    console.log(err.message);
  }
})

//updates profile information
app.put("/profile", async(req,res) =>
{
  try{
    username = req.params.username;
    full_name = req.body.full_name;
    address1 = req.body.address1;
    address2 = req.body.address2;
    city = req.body.city;
    state = req.body.state;
    zip = req.body.zip;

    const updateProfile = await pool.query("UPDATE profileInfo SET full_name=$1, address1=$2, address2=$3, city=$4, state=$5, zip=$6 WHERE username=$6"
    ,[full_name,address1,address2,city,state,zip,username]);
    console.log(updateProfile);
    res.json("profile was updated");
  }catch (err){
    console.log(err.message);
  }
})

app.listen(5500, () => {
    console.log("server has started on port 5500");
});