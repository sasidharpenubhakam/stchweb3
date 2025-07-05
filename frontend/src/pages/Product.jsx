import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const submitReview = async () => {
    if (!reviewName || !reviewText || !rating) {
      alert('Please fill all fields');
      return;
    }

    const res = await fetch('http://localhost:5000/api/product/add-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Remove authorization if not using user login system
      },
      body: JSON.stringify({
        productId,
        username: reviewName,
        comment: reviewText,
        rating: parseInt(rating)
      })
    });

    const data = await res.json();
    if (data.success) {
      alert('Review added!');
      fetchProductData(); // Reload updated product data
      setReviewName('');
      setReviewText('');
      setRating('');
    } else {
      alert('Error submitting review');
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={
                  i <= Math.round(productData.averageRating || 0)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt=""
                className="w-3 5"
              />
            ))}
            <p className="pl-2">({productData.reviews?.length || 0})</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <b className="border px-5 py-3 text-sm">
            Reviews ({productData.reviews?.length || 0})
          </b>
        </div>

        <div className="border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
          {productData.reviews?.length ? (
            productData.reviews.map((rev, i) => (
              <div key={i} className="border p-4 mb-3 rounded bg-gray-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold">{rev.username}</h4>
                  <span>
                    {'⭐'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
          <input
            type="text"
            placeholder="Your name"
            className="border p-2 w-full mb-2"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
          />
          <textarea
            placeholder="Your review"
            className="border p-2 w-full mb-2"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-2 w-full mb-2"
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && 's'}
              </option>
            ))}
          </select>
          <button
            onClick={submitReview}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
