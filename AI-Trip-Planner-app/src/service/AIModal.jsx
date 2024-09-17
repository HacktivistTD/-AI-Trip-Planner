import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a Travel Plan for Location: las vegas, for 3 Days for couple with a cheap budget, give me hotels options list with HotelName, Hotel address, price, hotel image url, geo coordinates, rating, description, ticket pricing, rating, description and suggested itinerary with placeName, place Details, place Image Url, Geo Coordinates, ticket Pricing, rating Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text: `{
            "trip_name": "Las Vegas Budget Getaway for Two",
            "duration": 3,
            "budget": "cheap",
            "travelers": 2,
            "location": "Las Vegas, Nevada",
            "hotels": [
              {
                "hotelName": "The D Las Vegas",
                "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
                "price": "$50 - $100 per night",
                "hotelImageUrl": "https://www.thedlv.com/images/uploads/site/hero/the-d-hero-desktop.jpg",
                "geoCoordinates": "36.1699, -115.1425",
                "rating": 4.0,
                "description": "A downtown hotel with a retro vibe, offering affordable rooms, a casino, and a variety of dining options."
              },
              {
                "hotelName": "Golden Nugget Las Vegas",
                "hotelAddress": "129 E Fremont St, Las Vegas, NV 89101",
                "price": "$75 - $150 per night",
                "hotelImageUrl": "https://www.goldennugget.com/las-vegas/images/hero-images/gn-lv-hero-image.jpg",
                "geoCoordinates": "36.1692, -115.1433",
                "rating": 4.5,
                "description": "A historic hotel with a modern twist, featuring a casino, an aquarium, and several restaurants."
              },
              {
                "hotelName": "Plaza Hotel & Casino",
                "hotelAddress": "1 Main Street, Las Vegas, NV 89101",
                "price": "$60 - $120 per night",
                "hotelImageUrl": "https://www.plazahotelcasino.com/wp-content/uploads/2023/02/plaza-hotel-casino-las-vegas-exterior-2.jpg",
                "geoCoordinates": "36.1698, -115.1427",
                "rating": 4.0,
                "description": "A downtown hotel with a classic feel, offering a casino, restaurants, and a rooftop pool."
              }
            ],
            "itinerary": [
              {
                "day": 1,
                "theme": "Downtown Exploration",
                "activities": [
                  {
                    "placeName": "Fremont Street Experience",
                    "placeDetails": "A pedestrian mall with a giant video screen, live music, and street performers.",
                    "placeImageUrl": "https://www.fremontstreetexperience.com/images/featured-images/fsx-header-new.jpg",
                    "geoCoordinates": "36.1696, -115.1427",
                    "ticketPricing": "Free",
                    "rating": 4.5,
                    "timeTravel": "10:00 AM - 2:00 PM"
                  },
                  {
                    "placeName": "Neon Museum",
                    "placeDetails": "A museum showcasing vintage Las Vegas signs.",
                    "placeImageUrl": "https://www.neonmuseum.org/wp-content/uploads/2022/03/Neon-Museum-Sign-Night-Exterior-2-1024x683.jpg",
                    "geoCoordinates": "36.1621, -115.1408",
                    "ticketPricing": "$20 - $30 per person",
                    "rating": 4.5,
                    "timeTravel": "2:30 PM - 4:30 PM"
                  },
                  {
                    "placeName": "Pinball Hall of Fame",
                    "placeDetails": "A museum with over 200 classic pinball machines.",
                    "placeImageUrl": "https://pinballhalloffame.org/img/home/Pinball-Hall-of-Fame-Front.jpg",
                    "geoCoordinates": "36.1704, -115.1488",
                    "ticketPricing": "$15 - $20 per person",
                    "rating": 4.0,
                    "timeTravel": "5:00 PM - 7:00 PM"
                  }
                ]
              },
              {
                "day": 2,
                "theme": "Strip Experience",
                "activities": [
                  {
                    "placeName": "Bellagio Fountains",
                    "placeDetails": "A spectacular water and light show.",
                    "placeImageUrl": "https://www.bellagio.com/content/dam/mgmresorts/bellagio/images/hero/fountains-hero-image.jpg",
                    "geoCoordinates": "36.1179, -115.1723",
                    "ticketPricing": "Free",
                    "rating": 5.0,
                    "timeTravel": "11:00 AM - 1:00 PM"
                  },
                  {
                    "placeName": "The LINQ Promenade",
                    "placeDetails": "An outdoor shopping and dining promenade with the High Roller observation wheel.",
                    "placeImageUrl": "https://www.caesars.com/content/dam/caesars/linq/images/hero/linq-hero-image.jpg",
                    "geoCoordinates": "36.1074, -115.1705",
                    "ticketPricing": "$30 - $40 per person for the High Roller",
                    "rating": 4.0,
                    "timeTravel": "1:30 PM - 4:30 PM"
                  },
                  {
                    "placeName": "Free Shows on the Strip",
                    "placeDetails": "Many casinos offer free shows, like the volcano at the Mirage and the dancing waters at the Wynn.",
                    "placeImageUrl": "https://www.mirage.com/content/dam/mgmresorts/mirage/images/hero/volcano-hero-image.jpg",
                    "geoCoordinates": "36.1077, -115.1726",
                    "ticketPricing": "Free",
                    "rating": 4.0,
                    "timeTravel": "5:00 PM - 7:00 PM"
                  }
                ]
              },
              {
                "day": 3,
                "theme": "Nature and Culture",
                "activities": [
                  {
                    "placeName": "Red Rock Canyon National Conservation Area",
                    "placeDetails": "A scenic area with red rock formations and hiking trails.",
                    "placeImageUrl": "https://www.nps.gov/redr/planyourvisit/images/red-rock-canyon.jpg",
                    "geoCoordinates": "36.2091, -115.2713",
                    "ticketPricing": "$15 per vehicle",
                    "rating": 4.5,
                    "timeTravel": "9:00 AM - 1:00 PM"
                  },
                  {
                    "placeName": "Mob Museum",
                    "placeDetails": "A museum dedicated to the history of organized crime.",
                    "placeImageUrl": "https://www.themobmuseum.org/wp-content/uploads/2015/02/Mob-Museum-Exterior.jpg",
                    "geoCoordinates": "36.1683, -115.1439",
                    "ticketPricing": "$25 - $30 per person",
                    "rating": 4.0,
                    "timeTravel": "2:00 PM - 4:00 PM"
                  }
                ]
              }
            ]
          }`
        }
      ]
    }
  ]
});
