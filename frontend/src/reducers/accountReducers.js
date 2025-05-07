import {
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_DETAILS_REQUEST,
  ACCOUNT_DETAILS_RESET,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_LIST_REQUEST,
  ACCOUNT_LIST_SUCCESS,
  ACCOUNT_LIST_FAIL,
  ACCOUNT_LIST_RESET,
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
  ACCOUNT_DELETE_REQUEST,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_UPDATE_RESET,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_FAIL,
  ACCOUNT_UPDATE_PROFILE_RESET,
} from '../constants/accountConstants'

export const accountLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_LOGIN_REQUEST:
      return { loading: true }
    case ACCOUNT_LOGIN_SUCCESS:
      return { loading: false, accountInfo: action.payload }
    case ACCOUNT_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_LOGOUT:
      return {}
    default:
      return state
  }
}

export const accountRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_REGISTER_REQUEST:
      return { loading: true }
    case ACCOUNT_REGISTER_SUCCESS:
      return { loading: false, accountInfo: action.payload }
    case ACCOUNT_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_LOGOUT:
      return {}
    default:
      return state
  }
}

export const accountDetailsReducer = (state = { account: {} }, action) => {
  switch (action.type) {
    case ACCOUNT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ACCOUNT_DETAILS_SUCCESS:
      return { loading: false, account: action.payload }
    case ACCOUNT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_DETAILS_RESET:
      return { account: {} }
    default:
      return state
  }
}

export const accountUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case ACCOUNT_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, accountInfo: action.payload }
    case ACCOUNT_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const accountListReducer = (state = { accounts: [] }, action) => {
  switch (action.type) {
    case ACCOUNT_LIST_REQUEST:
      return { loading: true }
    case ACCOUNT_LIST_SUCCESS:
      return { loading: false, accounts: action.payload }
    case ACCOUNT_LIST_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_LIST_RESET:
      return { accounts: [] }
    default:
      return state
  }
}

export const accountDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNT_DELETE_REQUEST:
      return { loading: true }
    case ACCOUNT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ACCOUNT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const accountUpdateReducer = (state = { account: {} }, action) => {
  switch (action.type) {
    case ACCOUNT_UPDATE_REQUEST:
      return { loading: true }
    case ACCOUNT_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case ACCOUNT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ACCOUNT_UPDATE_RESET:
      return {
        account: {},
      }
    default:
      return state
  }
}
