import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    PRODUCT_NUM: {
        type: Number,
        required: true
    },
    DEPARTMENT: {
        type: String
    },
    COMMODITY: {
        type: String
    },
    BRAND_TY: {
        type: String
    },
    NATURAL_ORGANIC_FLAG: {
        type: String
    }
}, { timestamps: false })

const Product = mongoose.model('Product', productSchema);
export default Product;