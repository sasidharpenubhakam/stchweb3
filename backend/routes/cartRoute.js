import express from 'express';
import {
    addToCart,
    updateCart,
    getUserCart,
    applyCoupon
} from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

// Cart routes with auth
cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/update', authUser, updateCart);
cartRouter.post('/get', authUser, getUserCart);

// ✅ New coupon route (optional to protect with auth)
cartRouter.post('/apply-coupon', authUser, applyCoupon);

export default cartRouter;