import mongoose from 'mongoose'



const productSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   
    // price per kg
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    weighPerUnit: {
      type: Number,
      required: true,
      default: 0,
    },
    // calculationUnit:{
    //   type: String,
    //   required: true,
    //   default: 'kg',
    // },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
