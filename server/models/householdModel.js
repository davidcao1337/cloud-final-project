import mongoose from "mongoose";

const Schema = mongoose.Schema;

const householdSchema = new Schema({
    householdId: {
        type: int,
        required: true,
        unique: true
    },
    ageRange: {
        type: String,
    },
    marital: {
        type: String
    },
    incomeRange: {
        type: String
    },
    homeOwner: {
        type: String
    },
    householdComposition: {
        type: String
    },
    householdSize: {
        type: String
    },
    children: {
        type: String
    }
}, { timestamps: false })

const Household = mongoose.model('Household', householdSchema);
export default Household;