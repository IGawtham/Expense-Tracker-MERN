import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'
import axios from 'axios'
//Initial state
const initialState = {
    // transactions: [
    //     { id: 1, text: 'Flower', amount: -20 },
    //     { id: 2, text: 'Salary', amount: 300 },
    //     { id: 3, text: 'Book', amount: -10 },
    //     { id: 4, text: 'Camera', amount: 150 }
    // ]
    transactions: [],
    error: null,
    loading: true
}

//Create Context

export const GlobalContext = createContext(initialState)

//Create Provider

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
    //create an Action

    async function getTransactions() {
        try {
            const response = await axios.get('/api/v1/transactions')
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: response.data.data
            })
        } catch (error) {
            dispatch({
                type: 'ERROR_TRANSACTION',
                payload: error.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`api/v1/transactions/${id}`)
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (error) {
            dispatch({
                type: 'ERROR_TRANSACTION',
                payload: error.response.data.error
            })
        }

    }
    async function addTransaction(transaction) {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        try {
            const response = await axios.post(`/api/v1/transactions`, transaction, config)
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: response.data.data
            })
        } catch (error) {
            dispatch({
                type: 'ERROR_TRANSACTION',
                payload: error.response.data.error
            })
        }

    }
    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions
    }}>
        {children}
    </GlobalContext.Provider>)
}