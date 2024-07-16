const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Expenses = require("../models/Expenses");

const getAllExpenses = async (req, res)=>{
    const { user: {userId}} = req;
    const expenses = await Expenses.find({createdBy:userId});
    res.status(200).json({expenses});
}

const getExpense = async (req, res) => {
    const { user: {userId}, params:{id: expenseID} } = req;
    const expense = await Expenses.findOne({_id:expenseID, createdBy: userId});
    if(!expense){
        throw new NotFoundError(`Expense with id ${expenseID} not found`)
    }
    res.status(StatusCodes.OK).json({expense});
}

const createExpense = async (req, res) =>{
    const {user:{userId}, body:{amount, category, merchant}} = req;
    if(!amount || !category || !merchant){
        throw new BadRequestError(' Please enter valid values for amount category and merchant')
    }
    const expense = await Expenses.create({...req.body, createdBy: userId})
    res.status(StatusCodes.CREATED).json({expense})
}

const updateExpense = async (req, res) => {
    const {user:{userId}, params:{id: expenseID}} = req;
    const expense = await Expenses.findOneAndUpdate({_id: expenseID, createdBy: userId },req.body, {new: true, runValidators: true});
    if(!expense){
        throw new NotFoundError(`Expense with id ${expenseID} not found`)
    }
    res.status(StatusCodes.OK).json({expense});
}

const deleteExpense = async (req, res) =>{
    const {user: {userId}, params:{id: expenseID}} = req;
    const expense = await Expenses.findOneAndDelete({_id: expenseID, createdBy: userId});
    if(!expense){
        throw new NotFoundError(`Expense with id ${expenseID} not found`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense
}