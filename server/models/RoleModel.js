import mongoose from "mongoose";

const RoleModel = new mongoose.Schema({
    role: {type: String, require: true, default: 'USER'}
});

export default mongoose.model('RoleModel', RoleModel)