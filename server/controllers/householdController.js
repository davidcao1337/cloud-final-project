import Household from "../models/householdModel"

// get all households
const getHouseholds = async( req, res) => {
    const household = await Household.find()
    
    res.status(200).json(foods)
}

// create a household
const createHousehold = async( req, res) => {
    const {
        householdId, 
        ageRange, 
        marital, 
        incomeRange,
        homeOwner,
        householdComposition, 
        householdSize, 
        children } = req.body
        
        // add doc to db
        try {
            const household = await Household.create({
                householdId, 
                ageRange, 
                marital, 
                incomeRange,
                homeOwner,
                householdComposition, 
                householdSize, 
                children
            })
            res.status(200).json(household)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
}

// exports
export {
    createHousehold,
    getHouseholds
}