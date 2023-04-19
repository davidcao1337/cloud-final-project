import { createContext, useReducer, useEffect } from 'react'

export const HouseholdContext = createContext();

export const HouseholdReducer = (state, action) => {
    switch (action.type) {
        case 'SET_HOUSEHOLD':
            return { household: action.payload }
        case 'CREATE_HOUSEHOLD':
            return { household: [action.payload, ...state.household] }
        case 'DELETE_HOUSEHOLd':
            return { household: state.foodItems.filter((s) => s._id !== action.payload._id) }
        default:
            return state;
    }
}

export const HouseholdContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(HouseholdReducer, {
        household: null
    })

    return (
        <HouseholdContext.Provider value={{...state, dispatch}}>
            { children }
        </HouseholdContext.Provider>
    )
}