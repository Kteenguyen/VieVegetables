import asyncHandler from 'express-async-handler';
import CartItem from '../models/cartItemModel';
import Cart from '../models/cartModel';

// @desc   Create a new cart
// @route   POST /api/cart
// @access  Public
const createCart = asyncHandler(async (req, res) => {
    const { accountId } = req.body;

    // Kiểm tra xem accountId có được cung cấp không
    if (!accountId) {
        res.status(400);
        throw new Error('accountId is required');
    }

    // Kiểm tra xem giỏ hàng đã tồn tại chưa
    let cart = await Cart.findOne({ accountId });
    // Nếu không tồn tại, tạo giỏ hàng mới
    if (!cart) {
        cart = new Cart({ accountId });
        await cart.save();
    }
    // Trả về giỏ hàng (mới hoặc đã tồn tại)
    res.status(200).json(cart);
});


// @desc   Add a CartItem to the cart
// @route   POST /api/cart/:cartId/items
// @access  Public
const addToCart = asyncHandler(async (req, res) => {
    const { cartId } = req.params; // Lấy cartId từ URL
    const { itemId, quantity } = req.body; // Lấy itemId và quantity từ body

    // Kiểm tra xem cartId và itemId có được cung cấp không
    if (!cartId || !itemId) {
        res.status(400);
        throw new Error('cartId and itemId are required');
    }

    // Tìm giỏ hàng theo cartId
    const cart = await Cart.findById(cartId);
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    // Tạo một CartItem mới
    const newCartItem = new CartItem({
        itemId,
        quantity,
    });

    // Lưu CartItem vào cơ sở dữ liệu
    await newCartItem.save();

    // Thêm CartItem vào giỏ hàng
    cart.items.push(newCartItem._id);
    await cart.save();

    // Trả về giỏ hàng đã cập nhật
    res.status(200).json(cart);
});


// @desc   Get cart by accountId
// @route   GET /api/cart/:accountId
// @access  Public
const getCart = asyncHandler(async (req, res) => {
    const { accountId } = req.params; // Lấy accountId từ URL

    // Tìm giỏ hàng theo accountId
    const cart = await Cart.findOne({ accountId }).populate('items'); // Populated để lấy dữ liệu CartItem

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    // Trả về giỏ hàng
    res.status(200).json(cart);
});

// @desc   Delete a CartItem from the cart
// @route   DELETE /api/cart/:cartId/items/:itemId
// @access  Public
const deleteCartItem = asyncHandler(async (req, res) => {
    const { cartId, itemId } = req.params; // Lấy cartId và itemId từ URL

    // Kiểm tra xem cartId và itemId có được cung cấp không
    if (!cartId || !itemId) {
        res.status(400);
        throw new Error('cartId and itemId are required');
    }

    // Tìm giỏ hàng theo cartId
    const cart = await Cart.findById(cartId);
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    // Tìm CartItem theo itemId
    const cartItem = await CartItem.findById(itemId);
    if (!cartItem) {
        res.status(404);
        throw new Error('CartItem not found');
    }

    // Xóa CartItem khỏi giỏ hàng
    cart.items.pull(cartItem._id);
    await cart.save();

    // Xóa CartItem khỏi cơ sở dữ liệu
    await CartItem.findByIdAndDelete(itemId);

    // Trả về giỏ hàng đã cập nhật
    res.status(200).json(cart);
});

// @desc   Delete a cart
// @route   DELETE /api/cart/:cartId
// @access  Public
const deleteCart = asyncHandler(async (req, res) => {
    const { cartId } = req.params; // Lấy cartId từ URL

    // Kiểm tra xem cartId có được cung cấp không
    if (!cartId) {
        res.status(400);
        throw new Error('cartId is required');
    }

    // Tìm giỏ hàng theo cartId
    const cart = await Cart.findById(cartId);
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    // Xóa tất cả CartItems liên quan
    await CartItem.deleteMany({ _id: { $in: cart.items } });

    // Xóa giỏ hàng
    await cart.remove();

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Cart deleted successfully' });
});

// @desc   Update quantity of a CartItem in the cart
// @route   PUT /api/cart/:cartId/items/:itemId
// @access  Public
const updateCart = asyncHandler(async (req, res) => {
    const { cartId, itemId } = req.params; // Lấy cartId và itemId từ URL
    const { quantity } = req.body; // Lấy quantity từ body

    // Kiểm tra xem cartId, itemId và quantity có được cung cấp không
    if (!cartId || !itemId || quantity === undefined) {
        res.status(400);
        throw new Error('cartId, itemId, and quantity are required');
    }

    // Tìm giỏ hàng theo cartId
    const cart = await Cart.findById(cartId);
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    // Tìm CartItem theo itemId
    const cartItem = await CartItem.findById(itemId);
    if (!cartItem) {
        res.status(404);
        throw new Error('CartItem not found');
    }

    // Cập nhật quantity của CartItem
    cartItem.quantity = quantity;
    await cartItem.save();

    // Trả về giỏ hàng đã cập nhật
    res.status(200).json(cart);
});

export default {
    createCart,
    updateCart,
    getCart,
    deleteCartItem,
    deleteCart
};