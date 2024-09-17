import React from 'react';

function Hotels({ trip }) {
  // Debugging: Log trip data to verify it contains the expected structure
  console.log('Hotels Component - Trip Data:', trip);

  return (
    <div className='p-5'>
      <h2 className='text-xl mt-5 font-bold'>Recommended Hotels</h2>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {trip?.tripData?.hotels && trip.tripData.hotels.length > 0 ? (
          trip.tripData.hotels.map((item, index) => (
            <div key={index} className='border rounded-lg overflow-hidden shadow-md'>
              <img
                src={item.hotelImageUrl || '/ESTD2009.png'} // Ensure each hotel object has `hotelImageUrl`
                alt={`Hotel ${index}`}
                className='w-full h-48 object-cover'
              />
              <div className='p-4'>
                <h3 className='text-lg font-semibold'>{item.hotelName || 'Hotel Name'}</h3>
                <p className='text-gray-600'>{item.description || 'No description available'}</p>
                <p className='text-gray-600'>{item.hotelAddress || 'Address not available'}</p>
                <p className='text-gray-600'>{item.price || 'Price not available'}</p>
                <p className='text-gray-600'>Rating: {item.rating ? item.rating : 'Not available'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels available.</p>
        )}
      </div>
    </div>
  );
}

export default Hotels;
