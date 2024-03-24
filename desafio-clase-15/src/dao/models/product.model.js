import mongoose from "mongoose"

const collection = "products"
const schema = new mongoose.Schema(
    {
        status: Boolean,
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true,
        },
        thumbnail: String,
        code: {
            type: String,
            required: true,
            unique: true
        },
        stock: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, strict: false
    }
)

export const modelProduct = mongoose.model(collection, schema)