import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Account from '../models/accountModel.js'

// @desc    Auth account & get token
// @route   POST /api/accounts/login
// @access  Public

const authAccount = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const account = await Account.findOne({ email })

  if (account && (await account.matchPassword(password))) {
    res.json({
      _id: account._id,
      name: account.accountName,
      email: account.email,
      phone: account.phone,
      address: account.address,
      isAdmin: account.isAdmin,
      token: generateToken(account._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new account
// @route   POST /api/accounts
// @access  Public
const registerAccount = asyncHandler(async (req, res) => {
  const { accountName, email, password } = req.body

  const accountExists = await Account.findOne({ email })

  if (accountExists) {
    res.status(400)
    throw new Error('Account already exists')
  }

  const account = await Account.create({
    accountName,
    email,
    password,
    phone, 
    address
  })

  if (account) {
    res.status(201).json({
      _id: account._id,
      accountName: account.accountName,
      email: account.email,
      phone: account.phone,
      address: account.address,
      isAdmin: account.isAdmin,
      token: generateToken(account._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid account data')
  }
})

// @desc    Get account profile
// @route   GET /api/accounts/profile
// @access  Private
const getAccountProfile = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.account._id)

  if (account) {
    res.json({
      _id: account._id,
      accountName: account.accountName,
      email: account.email,
      phone: account.phone,
      address: account.address,
      isAdmin: account.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Account not found')
  }
})

// @desc    Update account profile
// @route   PUT /api/accounts/profile
// @access  Private
const updateAccountProfile = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.account._id)

  if (account) {
    account.accountName = req.body.accountName || account.accountName
    account.email = req.body.email || account.email
    account.phone = req.body.phone || account.phone
    account.address = req.body.address || account.address
    if (req.body.password) {
      account.password = req.body.password
    }

    const updatedAccount = await account.save()

    res.json({
      _id: updatedAccount._id,
      name: updatedAccount.accountName,
      email: updatedAccount.email,
      phone: updatedAccount.phone,
      address: updatedAccount.address,
      isAdmin: updatedAccount.isAdmin,
      token: generateToken(updatedAccount._id),
    })
  } else {
    res.status(404)
    throw new Error('Account not found')
  }
})

// @desc    Get all accounts
// @route   GET /api/accounts
// @access  Private/Admin
const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({})
  res.json(accounts)
})

// @desc    Delete account
// @route   DELETE /api/accounts/:id
// @access  Private/Admin
const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id)

  if (account) {
    await account.remove()
    res.json({ message: 'Account removed' })
  } else {
    res.status(404)
    throw new Error('Account not found')
  }
})

// @desc    Get account by ID
// @route   GET /api/accounts/:id
// @access  Private/Admin
const getAccountById = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id).select('-password')

  if (account) {
    res.json(account)
  } else {
    res.status(404)
    throw new Error('Account not found')
  }
})

// @desc    Update account
// @route   PUT /api/accounts/:id
// @access  Private/Admin
const updateAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id)

  if (account) {
    account.accountName = req.body.accountName || account.accountName
    account.email = req.body.email || account.email
    account.isAdmin = req.body.isAdmin

    const updatedAccount = await account.save()

    res.json({
      _id: updatedAccount._id,
      name: updatedAccount.name,
      email: updatedAccount.email,
      isAdmin: updatedAccount.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Account not found')
  }
})

export {
  authAccount,
  registerAccount,
  getAccountProfile,
  updateAccountProfile,
  getAccounts,
  deleteAccount,
  getAccountById,
  updateAccount,
}
