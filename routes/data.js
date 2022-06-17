const User = require("../models/tasks");
const express = require("express");
const router = express.Router();
const app = express();

app.post("/addData", async (req, res) => {
    try {
        const user = await new User(req.body).save();
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;