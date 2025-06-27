import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images for the slider
  const sliderImages = assets.hero_slider_images || [assets.hero_img]; // Fallback to hero_img if slider_images not defined

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

  // Optional: Automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentImageIndex]); // Re-run effect when currentImageIndex changes

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 relative'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className=' font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side - Slider */}
      <div className='w-full sm:w-1/2 relative overflow-hidden'>
        <img
          className='w-full h-full object-cover transition-opacity duration-500 ease-in-out'
          src={sliderImages[currentImageIndex]}
          alt={`Hero Image ${currentImageIndex + 1}`}
          key={currentImageIndex} // Add key for re-rendering on image change
        />
        {/* Navigation Buttons */}
        {sliderImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className='absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 focus:outline-none'
            >
              &#10094;
            </button>
            <button
              onClick={nextImage}
              className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 focus:outline-none'
            >
              &#10095;
            </button>
          </>
        )}
        {/* Dots/Indicators (Optional) */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
          {sliderImages.map((_, index) => (
            <span
              key={index}
              className={`block w-3 h-3 rounded-full cursor-pointer ${
                index === currentImageIndex ? 'bg-white' : 'bg-gray-500'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
