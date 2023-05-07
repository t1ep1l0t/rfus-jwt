import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    refresh_token: {type: String, require: false},
    role: [{type: String, require: true}]
});

export default mongoose.model('UserModel', UserModel)