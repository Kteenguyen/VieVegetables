import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    cartItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true, // Tự động tạo ID
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Cart', // Tham chiếu đến model Cart
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Account', // Tham chiếu đến model Account
    },
    prroductId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product', // Tham chiếu đến model Product
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;