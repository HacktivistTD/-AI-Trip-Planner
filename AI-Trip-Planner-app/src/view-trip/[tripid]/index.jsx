import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Import Firebase methods
import { db } from '../../service/firebaseConfig'; // Make sure this points to your Firebase setup
import InfoSection from '../components/InfoSection';
import { toast } from 'react-toastify'; // Assuming you're using toast notifications
import Hotels from '../components/Hotels';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null); // Initialize as null for better handling of loading states
  const [loading, setLoading] = useState(true); // Loading state for fetch operation

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  /**
   * Function to fetch trip information from Firebase
   */
  const GetTripData = async () => {
    setLoading(true); // Start loading
    try {
      const docRef = doc(db, 'AiTrips', tripId); // Ensure 'AiTrips' matches your Firestore collection name
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
        toast('No trip found!');
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast('Error fetching trip details');
    } finally {
      setLoading(false); // End loading
    }
  };

  if (loading) {
    return <div className="p-10 md:px-20 lg:px-44 xl:px-56">Loading...</div>; // Placeholder while loading
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
      {trip ? <InfoSection trip={trip} /> : <p>No trip details available.</p>} {/* Conditional rendering */}
      
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* You can add recommended hotels section here if needed */}
      
      {/* Daily Plan */}
      {/* You can add daily plan section here if needed */}
    </div>
  );
}

export default Viewtrip;
