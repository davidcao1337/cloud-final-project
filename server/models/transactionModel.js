import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    BASKET_NUM: {
        type: Number
    },
    HSHD_NUM: {
        type: Number
    },
    PURCHASE_: {
        type: String
    },
    PRODUCT_NUM: {
        type: Number,
        required: true
    },
    SPEND: {
        type: Number
    },
    UNITS: {
        type: Number
    },
    STORE_R: {
        type: String
    },
    WEEK_NUM: {
        type: Number
    },
    YEAR: {
        type: Number
    }
}, { timestamps: false })

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;