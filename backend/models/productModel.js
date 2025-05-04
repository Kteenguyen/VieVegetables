import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category', // Tham chiếu đến model Category
  },
  productImage: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unitsOfCalculate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Tạo trường createdAt và updatedAt
})

const Product = mongoose.model('Product', productSchema)

export default Product