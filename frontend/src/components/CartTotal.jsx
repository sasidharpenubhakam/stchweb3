import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import axios from 'axios';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, token, backendUrl, cartItems, products } = useContext(ShopContext);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = async () => {
    const subtotal = getCartAmount();
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/apply-coupon',
        {
          coupon: couponCode,
          subtotal,
          cartItems // send cartItems for STCHGETONEFREE logic
        },
        { headers: { token } }
      );
      if (response.data.success) {
        setDiscount(response.data.discount);
        setCouponApplied(true);
      } else {
        alert(response.data.message || 'Invalid or Inapplicable Coupon');
        setDiscount(0);
        setCouponApplied(false);
      }
    } catch (error) {
      alert('Error applying coupon');
      setDiscount(0);
      setCouponApplied(false);
    }
  }

  const subtotal = getCartAmount();
  const totalBeforeDiscount = subtotal + delivery_fee;
  const totalAfterDiscount = totalBeforeDiscount - discount;

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {subtotal}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />

        {/* Coupon Input */}
        <div className='flex gap-2 mt-2'>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className='border p-1 text-sm w-full'
          />
          <button
            onClick={handleApplyCoupon}
            className='bg-black text-white px-3 py-1 text-sm rounded'
          >
            Apply
          </button>
        </div>

        {couponApplied && (
          <div className='flex justify-between text-green-600'>
            <p>Discount Applied</p>
            <p>- {currency} {discount}</p>
          </div>
        )}

        <div className='flex justify-between mt-2'>
          <b>Total</b>
          <b>{currency} {totalAfterDiscount}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal;
