import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true, // Tự động tạo ID
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Customer', // Tham chiếu đến model Customer
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date.now, // Mặc định thời gian tạo là hiện tại
    },
    status: {
      type: String,
      required: true,
      default: 'Pending', // Mặc định trạng thái là Pending
    },
    totalAmount: {
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