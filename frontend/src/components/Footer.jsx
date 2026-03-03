import React from 'react'
import { assets } from '../assets/assets' // Ensure this path is correct

const Footer = () => {
  return (
    <div className='bg-black text-white'>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-6'>

        {/* Logo & Description */}
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="STCH Logo" />
          <p className='w-full md:w-2/3 text-gray-400'>
            Our mission at STCH is to empower customers with choice, convenience, 
            and confidence. We're dedicated to providing a seamless shopping 
            experience that exceeds expectations, from browsing and ordering 
            to delivery and beyond.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-400'>
            <li><a href="/Home" className='hover:text-white'>Home</a></li>
            <li><a href="/about-us" className='hover:text-white'>About us</a></li>
            <li><a href="/delivery" className='hover:text-white'>Delivery</a></li>
            <li><a href="/privacy-policy" className='hover:text-white'>Privacy policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-400'>
            <li>7670851363</li>
            <li>stchbrand@gmail.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <p className='text-xl font-medium mb-5'>FOLLOW US</p>
          <div className='flex gap-4'>
            <a 
              href="https://www.instagram.com/stch_brand?utm_source=qr&igsh=ZWl0YjQ3N2h3bDZk" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src={assets.instagram_icon} 
                alt="Instagram" 
                className='w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-300'
              />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className='border-t border-gray-700 mt-10'>
        <p className='py-4 text-sm text-center text-gray-400'>
          Copyright 2024 @ STCH.com - All Rights Reserved.
        </p>

        <p className='pb-6 text-sm text-center text-gray-400'>
          Developed by Mr. Sasidhar Penubhakam 
          <span className="text-white ml-1">&#10084;</span>
        </p>
      </div>

    </div>
  )
}

export default Footer
