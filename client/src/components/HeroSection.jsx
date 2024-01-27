import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const HeroSection = () => {
  return (
    <div className='h-96 bg-cover bg-[url("https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")] flex justify-center items-center flex-col gap-6 '>
  {/* // bg-[#C6C3D6]  */}
<h1 className='text-4xl font-sans font-bold text-white mb-8 '>Discover the Best Agricultural products</h1>


      <form action='/products' className='flex flex-row items-center'>
        <input 
          className="w-full px-4 py-3 border rounded-l-lg shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring focus:border-blue-500 text-xl" 
          type="text" 
          placeholder='Search for Products' 
          name='Product'
        />
        <button 
          className='bg-blue-600 text-white text-2xl px-6 py-3 rounded-r-lg hover:bg-blue-700 focus:outline-none'
          type="submit"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>

    </div>
  );
}

export default HeroSection;
