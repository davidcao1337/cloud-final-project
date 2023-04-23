import mongoose from "mongoose";

const Schema = mongoose.Schema;

const householdSchema = new Schema({
    HSHD_NUM: {
        type: Number,
        required: true
    },
    L: {
        type: String
    },
    AGE_RANGE: {
        type: String
    },
    MARITAL: {
        type: String
    },
    INCOME_RANGE: {
        type: String
    },
    HOMEOWNER: {
        type: String
    },
    HSHD_COMPOSITION: {
        type: String
    },
    HH_SIZE: {
        type: Number
    },
    CHILDREN: {
        type: Number
    }
}, { timestamps: false })

const Household = mongoose.model('Household', householdSchema);
export default Household;