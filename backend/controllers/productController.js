import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { productId, productImage, productName, price, unitsOfCalculate, description } = req.body

  const product = new Product({
    productId,
    productImage,
    productName,
    price,
    unitsOfCalculate,
    description,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    price,
    description,
    productImage,
    unitsOfCalculate
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.productName = productName || product.productName
    product.price = price || product.price
    product.description = description || product.description
    product.productImage = productImage || product.productImage
    product.unitsOfCalculate = unitsOfCalculate || product.unitsOfCalculate

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
