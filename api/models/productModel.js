import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, default: 0, required: true },
        countInStock: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
        numReviews: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.model('Product', productSchema);
export default productModel;