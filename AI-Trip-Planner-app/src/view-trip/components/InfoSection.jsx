import React from 'react';
import { TbLocationFilled } from "react-icons/tb";
import { Button } from '../../components/ui/button'; // Ensure the Button component is imported correctly

function InfoSection({ trip }) {
  const location = trip?.userSelection?.location || 'Location not available';
  const { noOfDays, budget, traveler } = trip?.userSelection || {};

  return (
    <div className='p-5 bg-white rounded-lg shadow-md'>
      <img
        src='/ESTD2009.png'
        className='h-[340px] w-full object-cover rounded-xl mb-5'
        alt="Trip Cover"
      />
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-semibold'>{location}</h2>
          <Button>
            <TbLocationFilled className='text-lg' />
          </Button>
        </div>
        <div className='flex gap-4 flex-wrap'>
          <p className='p-2 bg-gray-200 rounded-full text-xs md:text-md'>
            <strong>Number of Days:</strong> {noOfDays || 'Not available'}
          </p>
          <p className='p-2 bg-gray-200 rounded-full text-xs md:text-md'>
            <strong>Budget:</strong> {budget || 'Not available'}
          </p>
          <p className='p-2 bg-gray-200 rounded-full text-xs md:text-md'>
            <strong>Traveler(s):</strong> {traveler || 'Not available'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
