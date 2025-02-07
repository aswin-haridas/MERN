const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./model/booking").default;
const app = express();

app.use(express.json());
app.use(cors());
require('dotenv').config();

app.use(cors());

// Database connection with error handling
mongoose.connect(process.env.mongo_url)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (_err, isMatch) => {
                    if (isMatch) {
                        res.status(200).json({ message: "Success" });
                    } else {
                        res.status(401).json({ message: "The password is incorrect" });
                    }
                });
            } else {
                res.status(404).json({ message: "No record existed" });
            }
        })
        .catch(err => res.status(500).json({ message: "Server error", error: err }));
});

// Registration route
app.post("/register", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Server error", error: err });

        UserModel.create({ email, password: hashedPassword })
            .then(user => res.status(201).json(user))
            .catch(err => res.status(500).json({ message: "Server error", error: err }));
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
