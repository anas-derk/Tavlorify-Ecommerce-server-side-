// Import Mongoose

const mongoose = require("mongoose");

// Create User Schema

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
});

// Create User Model From User Schema

const userModel = mongoose.model("user", userSchema);

// Import Database URL

const DB_URL = require("../global/DB_URL");

// require bcryptjs module for password encrypting

const bcrypt = require("bcryptjs");

// Define Create New User Function

async function createNewUser(email, password, firstName, lastName) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        let user = await userModel.findOne({ email });
        if (user) {
            await mongoose.disconnect();
            return "Sorry, Can't Create User Because it is Exist !!!";
        } else {
            // Encrypting The Password
            let encrypted_password = await bcrypt.hash(password, 10);
            // Create New Document From User Schema
            let newUser = new userModel({
                email,
                password: encrypted_password,
                firstName,
                lastName,
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
        throw Error("Sorry, Something Went Wrong !!");
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
            await mongoose.disconnect();
            if (isTruePassword) return user;
            else return "Sorry, Email Or Password Incorrect !!";
        }
        else {
            mongoose.disconnect();
            return "Sorry, Email Or Password Incorrect !!";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function getUserInfo(userId) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If User Is Exist
        let user = await userModel.findById(userId);
        await mongoose.disconnect();
        if (user) return user;
        return "Sorry, The User Is Not Exist !!, Please Enter Another Email ..";
    } catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function updateUserInfo(userId, newUserData) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If User Is Exist
        let user = await userModel.updateOne({_id: userId }, {
            email: newUserData.email,
            password: newUserData.password,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
        });
    console.log(user);
    await mongoose.disconnect();
    return "Update Process Successful ...";
} catch (err) {
    // Disconnect In DB
    await mongoose.disconnect();
    throw Error("Sorry, Error In Process, Please Repeated This Process !!");
}
}

module.exports = {
    createNewUser,
    login,
    getUserInfo,
    updateUserInfo,
}