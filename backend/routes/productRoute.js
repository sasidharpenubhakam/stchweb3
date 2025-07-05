import express from 'express';
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  addReview
} from '../controllers/productController.js';

import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js'; // ⬅️ For authenticated review posting

const productRouter = express.Router();

// ✅ ADMIN ROUTES

// Add product (with images)
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

// Remove product
productRouter.post('/remove', adminAuth, removeProduct);

// ✅ PUBLIC ROUTES

// Get a single product by ID
productRouter.post('/single', singleProduct);

// Get all products
productRouter.get('/list', listProducts);

// ✅ AUTHENTICATED USER ROUTE

// Add a product review
productRouter.post('/add-review', userAuth, addReview);

export default productRouter;
