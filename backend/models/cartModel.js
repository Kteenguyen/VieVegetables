const cartSchema = mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account', // Tham chiếu đến model Account
      required: true,
      unique: true, // Đảm bảo mỗi tài khoản chỉ có một giỏ hàng
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem', // Tham chiếu đến model CartItem
    }],
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);