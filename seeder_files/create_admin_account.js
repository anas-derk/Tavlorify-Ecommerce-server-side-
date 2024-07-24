const mongoose = require("mongoose");

require("dotenv").config({
    path: "../.env",
});

// Create Admin Schema

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Create Admin Model From Admin Schema

const adminModel = mongoose.model("admin", adminSchema);

const { hash } = require("bcryptjs");

const userInfo = {
    email: process.env.MAIN_ADMIN_EMAIL,
    password: process.env.MAIN_ADMIN_PASSWORD,
};

async function create_admin_user_account() {
    try {
        await mongoose.connect(process.env.DB_URL);
        let user = await adminModel.findOne({ email: userInfo.email });
        if (user) {
            return "Sorry, Can't Insert Admin Data To Database Because it is Exist !!";
        } else {
            let password = userInfo.password;
            let encrypted_password = await hash(password, 10);
            userInfo.password = encrypted_password;
            await (new adminModel(userInfo)).save();
            await mongoose.disconnect();
            return "Ok !!, Creating Admin Account Process Has Been Successfuly !!";
        }
    } catch(err) {
        await mongoose.disconnect();
        throw Error(err);
    }
}

create_admin_user_account().then((result) => console.log(result));