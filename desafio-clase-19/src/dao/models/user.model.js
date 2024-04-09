import mongoose from "mongoose"

const collection = "users"
const schema = new mongoose.Schema(
    {
        nombre: String,
        email: {
            type: String, unique: true
        },
        password: String
    }
)

export const modelUser = mongoose.model(collection, schema);