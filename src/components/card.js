import React from 'react';
import Image from 'next/image';

export default function card({ name, status, image, species, gender,  }) {
  return (
    <div>
      <div className='lg:w-[330px] md:max-w-[410px] sm:max-w-[550px] px-7 md:px-3 mx-auto  flex flex-col '>
        <Image className=' md:max-w-[410pxpx] lg:w-[350px] ' src={image} width={597} height={350} alt='' />
        <div className='bg-black flex-col justify-center items-center'>
          <p className=' text-center text-[20px] text-white py-2 mx-auto '>Name: {name}</p>
          <div className='text-center   text-[20px] rounded-xl text-white '>
            {status === 'Alive' ? (
              <p className='bg-green-400'>
                {status}
              </p>
            ) : status === 'Dead' ? (
              <p className='bg-[#e11d48]'>
                {status}
              </p>
            ) : (
              <p className='bg-blue-400'>
                {status}
              </p>
            )}
          </div>
          
            <p className=' text-center   rounded-xl  py-2 text-[20px] text-white '>Specie: {species}</p>
            <p className='text-center   rounded-xl  py-2 text-[20px] text-white '>Gender: {gender}</p>
            
          </div>
        </div>
      </div>
    
  );
}