import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// Add products to user cart
const addToCart = async(req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user cart
const updateCart = async(req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user cart data
const getUserCart = async(req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

        // The primary fix: Use the safe getter
        const cartData = await getCartDataSafe(userId);
        
        res.json({ success: true, cartData });

    } catch (error) {
        console.error("Error in getUserCart:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const applyCoupon = async(req, res) => {
    try {
        const { userId, coupon, subtotal, cartItems } = req.body;
        console.log("HERE,", coupon, subtotal);

        // GET10: 10% discount on subtotal
        if (coupon === 'STCH10' && subtotal > 0) {
            const discount = Math.round(subtotal * 0.10);
            return res.json({ success: true, discount });
        }

        // STCHGETONEFREE: If there are 4 or more t-shirts, discount price of cheapest t-shirt
        if (coupon === 'STCHGETONEFREE' && cartItems) {
            let tshirtItems = [];
            for (const itemId in cartItems) {
                const product = await productModel.findById(itemId);
                if (product) {
                    for (const size in cartItems[itemId]) {
                        for (let i = 0; i < cartItems[itemId][size]; i++) {
                            tshirtItems.push(product.price);
                        }
                    }
                }
            }
            if (tshirtItems.length >= 4) {
                const minPrice = Math.min(...tshirtItems);
                return res.json({ success: true, discount: minPrice });
            }
        }

        res.json({ success: false, message: 'Invalid or inapplicable coupon' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    addToCart,
    updateCart,
    getUserCart,
    applyCoupon // ✅ Exported the new controller
};
