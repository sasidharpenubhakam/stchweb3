import React from 'react'
import { assets } from '../assets/assets' // Ensure this path is correct

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li><a href="/">Home</a></li>
                <li><a href="/about-us">About us</a></li>
                <li><a href="/delivery">Delivery</a></li>
                <li><a href="/privacy-policy">Privacy policy</a></li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>7995127206</li>
                <li>stchbrand@gmail.com</li>
            </ul>
        </div>

        {/* New Social Media Section */}
        <div>
            <p className='text-xl font-medium mb-5'>FOLLOW US</p>
            <div className='flex gap-4'> {/* Use flexbox for horizontal alignment of icons */}
                <a href="https://www.instagram.com/your_instagram_profile" target="_blank" rel="noopener noreferrer">
                    <img src={assets.instagram_icon} alt="Instagram" className='w-8 h-8 cursor-pointer' />
                {/* </a> */}
                {/* { Add more social media links here } */}
                {/* {<a href="https://www.facebook.com/your_facebook_page" target="_blank" rel="noopener noreferrer"> */}
                    {/* <img src={assets.facebook_icon} alt="Facebook" className='w-8 h-8 cursor-pointer' /> */}
                </a>
                {/* <a href="https://www.twitter.com/your_twitter_profile" target="_blank" rel="noopener noreferrer"> */}
                    {/* <img src={assets.twitter_icon} alt="Twitter" className='w-8 h-8 cursor-pointer' /> */}
                {/* </a> } */}
            </div>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ STCH.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer