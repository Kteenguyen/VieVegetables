import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import OrderItem from '../models/orderItemModel.js'; // Nhập OrderItem model

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    customerId,
    shippingAddress,
    itemsPrice,
    price,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Tạo đơn hàng mới
  const order = new Order({
    customerId,
    shippingAddress,
    itemsPrice,
    price,
    totalPrice,
  });

  const createdOrder = await order.save();

  // Tạo các OrderItem cho đơn hàng
  const orderItemsToCreate = orderItems.map(item => ({
    orderId: createdOrder._id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
  }));

  await OrderItem.insertMany(orderItemsToCreate);

  res.status(201).json({ ...createdOrder.toObject(), orderItems: orderItemsToCreate });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('customerId', 'name email');
  
  if (order) {
    const orderItems = await OrderItem.find({ orderId: order._id });
    res.json({ ...order.toObject(), orderItems });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in account orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customerId: req.account._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('customerId', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};