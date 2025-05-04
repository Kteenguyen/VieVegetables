// models/orderItemModel.js
import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema(
  {
    orderItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true, // Tự động tạo ID
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order', // Tham chiếu đến model Order
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product', // Tham chiếu đến model Product
    },
    quantity: {
      type: Number,
      required: true,
      default: 1, // Mặc định số lượng là 1
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

export default OrderItem;