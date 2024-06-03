import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_email_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'role', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

const User = mongoose.model('User', userSchema);
export default User