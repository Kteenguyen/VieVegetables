import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getAccountDetails, updateAccount } from '../actions/accountActions'
import { ACCOUNT_UPDATE_RESET } from '../constants/accountConstants'

const AccountEditScreen = ({ match, history }) => {
  const accountId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const accountDetails = useSelector((state) => state.accountDetails)
  const { loading, error, account } = accountDetails

  const accountUpdate = useSelector((state) => state.accountUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = accountUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ACCOUNT_UPDATE_RESET })
      history.push('/admin/accountlist')
    } else {
      if (!account.name || account._id !== accountId) {
        dispatch(getAccountDetails(accountId))
      } else {
        setName(account.name)
        setEmail(account.email)
        setIsAdmin(account.isAdmin)
      }
    }
  }, [dispatch, history, accountId, account, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateAccount({ _id: accountId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/accountlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Account</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default AccountEditScreen
