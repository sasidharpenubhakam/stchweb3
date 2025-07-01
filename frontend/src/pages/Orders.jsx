import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {

  const { backendUrl, token , currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        console.log("response order", response.data.orders);
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            console.log("ITEM", item);
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
        console.log(allOrdersItem.reverse());
      }

    } catch (error) {

    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      if (!token) {
        toast.error('You must be logged in to cancel an order.');
        return;
      }
      const response = await axios.post(
        backendUrl + '/api/order/cancel',
        { orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Order cancelled successfully.');
        loadOrderData();
      } else {
        toast.error(response.data.message || 'Failed to cancel order.');
      }
    } catch (error) {
      toast.error('Error cancelling order.');
    }
  };

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>

        <div className='text-2xl'>
            <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

        <div>
            {
              orderData.map((item,index) => (
                <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                        <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                        <div>
                          <p className='sm:text-base font-medium'>{item.name}</p>
                          <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                            <p>{currency}{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Size: {item.size}</p>
                          </div>
                          <p className='mt-1'>Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                          <p className='mt-1'>Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm md:text-base'>{item.status}</p>
                        </div>
                        <div>
                          {(item.status !== 'Cancelled' && item.status !== 'Shipped' && item.status !== 'Delivered') && (
                              <button
                                onClick={() => handleCancelOrder(item.orderId)}
                                className='border px-4 py-2 text-sm font-medium rounded-sm text-red-600 border-red-400 mr-2'>
                                Cancel Order
                              </button>
                          )}
                          <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                        </div>
                    </div>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default Orders
