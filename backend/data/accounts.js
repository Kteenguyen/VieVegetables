import bcrypt from 'bcryptjs'

const accounts = [
  {
    name: 'Admin account',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Thrishna',
    email: 'thrishna@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Niharika',
    email: 'niharika@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default accounts

