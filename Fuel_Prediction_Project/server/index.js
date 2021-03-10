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

app.listen(5500, () => {
    console.log("server has started on port 5500");
});