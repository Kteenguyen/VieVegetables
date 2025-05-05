import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'


const Product = ({ product }) => {
  console.log(product[0])
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.productImage} variant='' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.productName}</strong>
          </Card.Title>
        </Link>
        
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>    
  )
}

export default Product

