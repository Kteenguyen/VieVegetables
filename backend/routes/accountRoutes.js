import express from 'express'
const router = express.Router()
import {
  authAccount,
  registerAccount,
  getAccountProfile,
  updateAccountProfile,
  getAccounts,
  deleteAccount,
  getAccountById,
  updateAccount,
} from '../controllers/accountController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerAccount).get(protect, admin, getAccounts)
router.post('/login', authAccount)
router
  .route('/profile')
  .get(protect, getAccountProfile)
  .put(protect, updateAccountProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteAccount)
  .get(protect, admin, getAccountById)
  .put(protect, admin, updateAccount)

export default router
