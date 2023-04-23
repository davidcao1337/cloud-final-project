import Household from "../models/householdModel.js"
import Product from "../models/productModel.js"
import Transaction from "../models/transactionModel.js"
import mongoose from "mongoose"

const getData = async(req, res) => {
    const { hshd_num_selection, sort_selection } = req.params

    // Cast hshd_num_selection to Number
    var hshd_num = Number(hshd_num_selection)

    // Join Household, Product, and Transaction collections together based on HSHD_NUM and PRODUCT_NUM
    const householdsTransactionsProducts = await Household.aggregate([
        {
            $match: { HSHD_NUM: hshd_num }
        },
        {
            $lookup: {
                from: "transactions",
                localField: "HSHD_NUM",
                foreignField: "HSHD_NUM",
                as: "transactions"
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "transactions.PRODUCT_NUM",
                foreignField: "PRODUCT_NUM",
                as: "products"
            }
        }
    ])

    // Filter based on hshd_num_selection
    const filteredData = householdsTransactionsProducts.filter(household => household.HSHD_NUM === hshd_num)
    
    // Sort based on sort_selection (BASKET_NUM, DATE, PRODUCT_NUM, DEPARTMENT, COMMODITY)
    if (sort_selection === "BASKET_NUM") {
        filteredData.sort((a, b) => a.transactions[0].BASKET_NUM - b.transactions[0].BASKET_NUM)
    }
    else if (sort_selection === "DATE") {
        filteredData.sort((a, b) => new Date(a.transactions[0].PURCHASE_) - new Date(b.transactions[0].PURCHASE_))
    }
    else if (sort_selection === "PRODUCT_NUM") {
        filteredData.sort((a, b) => a.transactions[0].PRODUCT_NUM.localeCompare(b.transactions[0].PRODUCT_NUM))
    }
    else if (sort_selection === "DEPARTMENT") {
        filteredData.sort((a, b) => a.products[0].DEPARTMENT.localeCompare(b.products[0].DEPARTMENT))
    }
    else if (sort_selection === "COMMODITY") {
        filteredData.sort((a, b) => a.products[0].COMMODITY.localeCompare(b.products[0].COMMODITY))
    }

    // Return sorted filtered data
    res.status(200).json(filteredData)
}
export { getData }
