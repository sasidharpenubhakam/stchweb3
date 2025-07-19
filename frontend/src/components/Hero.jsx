import React from 'react'; // Removed useState, useEffect as they are no longer needed for a static image
import { assets } from '../assets/assets';

const Hero = () => {
  // All previous state (currentImageIndex) and effects (useEffect for auto-sliding)
  // as well as slider-related functions (nextImage, prevImage, sliderImages) have been removed
  // as the component will now display a single static image.

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 relative'>
      {/* Hero Left Side - This section remains unchanged */}
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
      {/* Hero Right Side - Now displays a single static image */}
      <div className='w-full sm:w-1/2 relative overflow-hidden'>
        <img
          className='w-full h-full object-cover' // Removed 'transition-opacity duration-500 ease-in-out' as it's no longer a slider
          src={assets.hero_img} // Directly uses the single hero_img from your assets
          alt="Hero Image for Latest Arrivals" // Updated alt text for clarity
          // Removed 'key={currentImageIndex}' as it's not a dynamic slider image anymore
        />
        {/*
          Removed:
          - Navigation Buttons (prevImage, nextImage)
          - Dots/Indicators for slider navigation
          These elements are not needed for a static image display.
        */}
      </div>
    </div>
  );
};

export default Hero;
