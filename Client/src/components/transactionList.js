import React, { useContext, useEffect } from 'react'
import { GlobalContext } from './../context/globalState';
import Transaction from './transaction';

function TransactionList() {
    const { transactions, getTransactions } = useContext(GlobalContext)
    useEffect(() => {
        getTransactions()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h3>History</h3>
            <ul id="list" className="list">
                {transactions.map(transaction => <Transaction transaction={transaction} key={transaction.id} />)}

            </ul>
        </div>
    )
}

export default TransactionList
