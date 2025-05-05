import bcrypt from 'bcryptjs'

const accounts = [
  {
    accountName: 'Admin account',
    email: 'admin@example.com',
    phone: '123-456-7890', // 
    address: '123 Admin St, City, Country', 
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    accountName: 'Thrishna',
    email: 'thrishna@gmail.com',
    phone: '987-654-3210', 
    address: '456 User Ave, City, Country', 
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false, 
  },
  {
    accountName: 'Niharika',
    email: 'niharika@gmail.com',
    phone: '555-123-4567', 
    address: '789 Member Rd, City, Country', 
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false, 
  },
]

export default accounts

