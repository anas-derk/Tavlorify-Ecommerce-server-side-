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

const DB_URL = require("../global/DB_URL");

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// Define Create New User Function

async function createNewUser(email, password, name) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let user = await userModel.findOne({ email });
        if (user) {
            return "Sorry, Can't Insert Admin Data To Database Because it is Exist !!!";
        } else {
            // Encrypting The Password
            let encrypted_password = await bcrypt.hash(password, 10);
            // Create New Document From User Schema
            let newUser = new userModel({
                email,
                password: encrypted_password,
                name
            });
            // Save The New User As Document In User Collection
            await newUser.save();
            // Disconnect In DB
            await mongoose.disconnect();
            return "Ok !!, Create New User Is Successfuly !!";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function login(email, password) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let user = await userModel.findOne({ email });
        if (user) {
            // Check From Password
            let isTruePassword = await bcrypt.compare(password, user.password);
            if (isTruePassword) return user;
            else return "Sorry, The Password Entereted Is Not True !!"
        }
        else return "Sorry, The User Is Not Exist !!, Please Enter Another Email ..";
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

module.exports = {
    createNewUser,
    login,
}