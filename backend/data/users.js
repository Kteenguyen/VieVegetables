import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'henry',
    email: 'henry@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users

