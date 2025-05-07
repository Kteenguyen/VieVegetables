import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAccounts, deleteAccount } from '../actions/accountActions'

const AccountListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const accountList = useSelector((state) => state.accountList)
  const { loading, error, accounts } = accountList

  const accountLogin = useSelector((state) => state.accountLogin)
  const { accountInfo } = accountLogin

  const accountDelete = useSelector((state) => state.accountDelete)
  const { success: successDelete } = accountDelete

  useEffect(() => {
    if (accountInfo && accountInfo.isAdmin) {
      dispatch(listAccounts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, accountInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteAccount(id))
    }
  }

  return (
    <>
      <h1>Accounts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account._id}>
                <td>{account._id}</td>
                <td>{account.name}</td>
                <td>
                  <a href={`mailto:${account.email}`}>{account.email}</a>
                </td>
                <td>
                  {account.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/account/${account._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(account._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default AccountListScreen
