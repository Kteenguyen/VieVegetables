const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true, // Tự động tạo ID
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Account', // Tham chiếu đến model Account
    },
    createAt: {
      type: Date,
      required: true,
      default: Date.now, // Mặc định thời gian tạo là hiện tại
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    item: [{
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'CartItem', // Tham chiếu đến model CartItem
    }
    ]
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;