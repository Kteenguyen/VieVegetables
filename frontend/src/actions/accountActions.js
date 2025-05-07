import axios from 'axios'
import {
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_LOGIN_FAIL,
  ACCOUNT_LOGIN_REQUEST,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGOUT,
  ACCOUNT_REGISTER_FAIL,
  ACCOUNT_REGISTER_REQUEST,
  ACCOUNT_REGISTER_SUCCESS,
  ACCOUNT_UPDATE_PROFILE_FAIL,
  ACCOUNT_UPDATE_PROFILE_REQUEST,
  ACCOUNT_UPDATE_PROFILE_SUCCESS,
  ACCOUNT_DETAILS_RESET,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_RESET,
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_REQUEST,
} from '../constants/accountConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ACCOUNT_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/accounts/login',
      { email, password },
      config
    )

    dispatch({
      type: ACCOUNT_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('accountInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ACCOUNT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('accountInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: ACCOUNT_LOGOUT })
  dispatch({ type: ACCOUNT_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: ACCOUNT_LIST_RESET })
  document.location.href = '/login'
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ACCOUNT_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/accounts',
      { name, email, password },
      config
    )

    dispatch({
      type: ACCOUNT_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: ACCOUNT_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('accountInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ACCOUNT_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getAccountDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_DETAILS_REQUEST,
    })

    const {
      accountLogin: { accountInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/accounts/${id}`, config)

    dispatch({
      type: ACCOUNT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ACCOUNT_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updateAccountProfile = (account) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_UPDATE_PROFILE_REQUEST,
    })

    const {
      accountLogin: { accountInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/accounts/profile`, account, config)

    dispatch({
      type: ACCOUNT_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: ACCOUNT_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('accountInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ACCOUNT_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}

export const listAccounts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_LIST_REQUEST,
    })

    const {
      accountLogin: { accountInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/accounts`, config)

    dispatch({
      type: ACCOUNT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ACCOUNT_LIST_FAIL,
      payload: message,
    })
  }
}

export const deleteAccount = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_DELETE_REQUEST,
    })

    const {
      accountLogin: { accountInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${accountInfo.token}`,
      },
    }

    await axios.delete(`/api/accounts/${id}`, config)

    dispatch({ type: ACCOUNT_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ACCOUNT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateAccount = (account) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACCOUNT_UPDATE_REQUEST,
    })

    const {
      accountLogin: { accountInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/accounts/${account._id}`, account, config)

    dispatch({ type: ACCOUNT_UPDATE_SUCCESS })

    dispatch({ type: ACCOUNT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ACCOUNT_UPDATE_FAIL,
      payload: message,
    })
  }
}

