const connection = require('./database');
const User = require('./models/tasks');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors())

connection();

//Routes
app.post("/addData", async (req, res) => {
    const {name, username, email, phone, password} = req.body
    User.findOne({username: username}, (err, user) => {
         if(user) {
             res.send({message: 'Username not available'})
         }
         else {
            try {
                const user = new User({
                    name,
                    username,
                    email,
                    phone,
                    password
                })
                user.save(err => {
                    if(err) {
                        res.send(err)
                    } else {
                        res.send({message: 'Success!'})
                    }
                })
               } catch(err) {
                   res.send(err);
               }
         }
    })
})

app.post("/login", async (req, res) => {
      const {username, email, password} = req.body
      User.findOne({email: email}, (err, user) => {
            if(user) {
                if(password === user.password) {
                    res.send({message: "Loggged in success!", user: user})
                }
                else {
                    res.send({message: "Try Again, password did not match!"})
                }
            }
            else {
                res.send({message: "User not found"});
            }
      })
})

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`))