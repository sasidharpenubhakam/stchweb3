import React from 'react'; // We no longer need useState or useEffect for a static image
import { assets } from '../assets/assets';

const Hero = () => {
  // Remove all state and effect hooks related to the slider
  // const [currentImageIndex, setCurrentImageIndex] = useState(0); // REMOVE THIS LINE

  // Remove the sliderImages array definition
  // const sliderImages = assets.hero_slider_images || [assets.hero_img]; // REMOVE THIS LINE

  // Remove the navigation functions
  // const nextImage = () => { ... }; // REMOVE THIS FUNCTION
  // const prevImage = () => { ... }; // REMOVE THIS FUNCTION

  // Remove the automatic sliding effect
  // useEffect(() => { ... }, [currentImageIndex]); // REMOVE THIS useEffect BLOCK

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 relative'>
      {/* Hero Left Side - This part remains the same */}
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
      {/* Hero Right Side - Change this to display a static image */}
      <div className='w-full sm:w-1/2 relative overflow-hidden'>
        <img
          className='w-full h-full object-cover' // Removed 'transition-opacity duration-500 ease-in-out' as it's no longer needed
          src={assets.hero_img} // This will now always display your 'hero_img'
          alt="Hero Image for Latest Arrivals" // Update alt text as appropriate
          // Removed 'key={currentImageIndex}' as it's not a dynamic image anymore
        />
        {/*
          Remove the navigation buttons and dots/indicators,
          as they are part of the slider functionality.
        */}
        {/* REMOVE THIS BLOCK
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
        */}
        {/* REMOVE THIS BLOCK
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
        */}
      </div>
    </div>
  );
};

export default Hero;
