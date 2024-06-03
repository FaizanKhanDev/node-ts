import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

const Role = mongoose.model('role', roleSchema);
export default Role