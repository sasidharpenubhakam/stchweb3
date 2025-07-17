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
        const userData = await userModel.findById(userId);

        let cartData = await userData.cartData;



        res.json({ success: true, cartData });



    } catch (error) {

        console.log(error);

        res.json({ success: false, message: error.message });

    }

};
        
const applyCoupon = async (req, res) => {
    try {
        const { userId, coupon, subtotal, cartItems } = req.body;
        console.log("Coupon Request - User ID:", userId); // Added for better logging
        console.log("Coupon Code:", coupon);
        console.log("Subtotal:", subtotal);
        // console.log("Cart Items for Coupon:", JSON.stringify(cartItems, null, 2)); // Uncomment for detailed debugging

        // DSR200 coupon: Flat 200 discount if subtotal is positive
        if (coupon === 'DSR200' && subtotal > 0) { // <-- MODIFIED HERE: Coupon code changed to DSR200
            console.log("Applying DSR200 coupon (Flat 200 discount).");
            const discount = 200; // <-- MODIFIED HERE: Discount changed to flat 200
            return res.json({ success: true, discount }); // Return immediately after successful application
        }

        // STCHGETONEFREE: If there are 4 or more t-shirts, discount price of cheapest t-shirt
        // This coupon logic remains unchanged as per your request.
        if (coupon === 'STCHGETONEFREE' && cartItems) {
            console.log("Applying STCHGETONEFREE coupon...");
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
            console.log("Collected T-shirt prices for STCHGETONEFREE:", tshirtItems);
            if (tshirtItems.length >= 4) {
                const minPrice = Math.min(...tshirtItems);
                console.log(`STCHGETONEFREE: Found ${tshirtItems.length} eligible items. Applying discount of cheapest: ${minPrice}`);
                return res.json({ success: true, discount: minPrice });
            } else {
                 console.log(`STCHGETONEFREE: Not enough eligible items (${tshirtItems.length} found, 4 required).`);
            }
        }

        // If none of the above conditions are met
        console.log("No valid coupon applied or conditions not met for coupon:", coupon);
        res.json({ success: false, message: 'Invalid or inapplicable coupon' });

    } catch (error) {
        console.error("Error in applyCoupon:", error); // Use console.error for consistency
        res.json({ success: false, message: error.message });
    }
};

// Make sure your exports include applyCoupon if this is a separate file
// export {
//     addToCart,
//     updateCart,
//     getUserCart,
//     applyCoupon
// };
