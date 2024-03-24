import mongoose from "mongoose"

const collection = "carts"
const schema = new mongoose.Schema(
    {
        products: Array
    },
    {
        timestamps: true, strict: false
    }
)

export const modelCart = mongoose.model(collection, schema)