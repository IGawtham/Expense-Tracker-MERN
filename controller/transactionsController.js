const Transaction = require('../models/Transaction')


//@Description Get all Transactions
//@route GET/api/v1/transactions
//@access public

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find()
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        return res.send(500).json({
            success: false,
            error: 'Server error'
        })
    }
}

//@Description Add a Transaction
//@route POST/api/v1/transaction
//@access public

exports.addTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create(req.body)
        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message)
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.send(500).json({
                success: false,
                error: 'Server error'
            })
        }

    }
}

//@Description Delete a Transaction
//@route POST/api/v1/transaction/:id
//@access public

exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: "No Transaction found"
            })
        }
        await transaction.remove()

        return res.status(200).json({
            success: true,
            data: {}
        })

    } catch (error) {
        return res.send(500).json({
            success: false,
            error: 'Server error'
        })
    }
}