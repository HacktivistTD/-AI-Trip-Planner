import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '../constants/option';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '../service/AIModal';
import { FcGoogle } from 'react-icons/fc';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../service/firebaseConfig'; // Import the Firestore instance
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'; // Corrected navigation hook

function CreateTrip() {
  const [place, setPlace] = useState(null); // Initialize as null
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Corrected navigation hook

  // Handle input changes to update form data
  const handleInputChanges = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('Form Data Updated:', formData);
  }, [formData]);

  // Function to fetch user profile data after successful Google login
  const GetUserProfile = async (token) => {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: 'application/json',
        },
      });
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDialog(false);
      OnGenerateTrip(); // Automatically generate the trip after logging in
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast('Failed to fetch user profile. Please try again.');
    }
  };

  // Google Login function
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Login Success:', tokenResponse);
      GetUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      toast('Google login failed. Please try again.');
    },
  });

  // Function to save AI trip data to Firestore
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, 'AiTrips', docId), {
        userSelection: formData,
        tripdata: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
      setLoading(false);
      toast('Trip saved successfully!');
      navigate('/view-trip/' + docId); // Moved navigation here after successful save
    } catch (error) {
      console.error('Error saving trip data: ', error);
      toast('Failed to save trip data. Please try again.');
    }
  };

  // Function to handle form submission
  const OnGenerateTrip = async (e) => {
    e?.preventDefault(); // Ensure this is only called when `e` is available

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Validate form data
    if (!place) {
      toast('Please select a destination.');
      return;
    }

    if (!formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast('Please fill in all details.');
      return;
    }

    try {
      setLoading(true);
      // Prepare AI prompt
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData.location)
        .replace('{totalDays}', formData.noOfDays)
        .replace('{traveler}', formData.traveler)
        .replace('{budget}', formData.budget);

      console.log('AI Prompt:', FINAL_PROMPT);

      // Send message to AI model
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const aiResponse = await result?.response?.text();
      console.log('AI Response:', aiResponse);

      // Save trip data with AI response
      await SaveAiTrip(aiResponse);
    } catch (error) {
      console.error('Error sending message: ', error);
      toast('Failed to generate the trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='text-2xl font-semibold mb-5'>Tell us your Preferences</h2>
      <form onSubmit={OnGenerateTrip}>
        {/* Destination Field */}
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
                handleInputChanges('location', v.label); // Updated to use v.label
              },
            }}
          />
        </div>

        {/* Number of Travel Days */}
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

        {/* Budget Selection */}
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

        {/* Travel Preferences */}
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

        {/* Submit Button */}
        <div>
          <Button type='submit' disabled={loading}>
            {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
          </Button>
        </div>
      </form>

      {/* Dialog for Google Sign-In */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <div className='mt-4'>
              <div className='items-center'>
                <img src='/ESTD2009.png' width='100' height='100' alt='Logo' />
              </div>
              <h2 className='mt-2'>Sign In With Google.</h2>
              <Button className='w-full mt-5 flex gap-4 items-center' onClick={login}>
                {loading ? 'Signing in...' : (
                  <>
                    Sign in with Google
                    <FcGoogle className='h-7 w-7' />
                  </>
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
