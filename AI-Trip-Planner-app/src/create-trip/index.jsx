import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '../constants/option';
import { Button } from '../components/ui/button';
import { toast } from "sonner"
import { chatSession } from '../service/AIModal';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});

  const handleInputChanges = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = async (e) => {
    e.preventDefault(); 

    if (formData?.noOfDays > 5 && formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please Fill All Details.");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT); // Correct use of await
      console.log(await result?.response?.text());
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='text-2xl font-semibold mb-5'>Tell us your Preferences</h2>
      <form onSubmit={OnGenerateTrip}>
        <div className='mb-4'>
          <label htmlFor='destination' className='block text-gray-700 text-sm font-bold mb-2'>
            Destination:
          </label>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChanges('location', v.label);
              },
            }}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='date' className='block text-gray-700 text-sm font-bold mb-2'>
            Number Of Travel Days:
          </label>
          <Input
            placeholder={'Ex. 3'}
            type='number'
            className='w-full px-3 py-2 border rounded'
            onChange={(e) => handleInputChanges('noOfDays', e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='budget' className='block text-gray-700 text-sm font-bold mb-2'>
            Budget:
          </label>
          <div className='grid grid-cols-4 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChanges('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow ${
                  formData.budget === item.title ? 'bg-blue-100 border-blue-500 shadow-lg' : ''
                }`}
              >
                <h2>{item.icon}</h2>
                <h2>{item.title}</h2>
                <h2>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='travelers' className='block text-gray-700 text-sm font-bold mb-2'>
            Travel Preferences:
          </label>
          <div className='grid grid-cols-4 gap-5 mt-5'>
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChanges('traveler', item.people)}
                className={`p-4 border rounded-lg ${
                  formData.budget ? 'hover:shadow-lg' : 'cursor-not-allowed'
                } ${
                  formData.traveler === item.people
                    ? 'bg-blue-100 border-blue-500 shadow-lg'
                    : ''
                } ${formData.budget ? 'hover:bg-gray-100' : ''}`}
              >
                <h2>{item.icon}</h2>
                <h2>{item.title}</h2>
                <h2>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Button type='button' onClick={OnGenerateTrip}>
            Generate Trip
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateTrip;
