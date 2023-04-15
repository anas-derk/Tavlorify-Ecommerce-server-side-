// Import Mongoose

const mongoose = require("mongoose");

// Create User Schema

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String
});

// Create User Model From User Schema

const userModel = mongoose.model("user", userSchema);

// Import Database URL

const DB_URL = require("../DB_URL");

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");