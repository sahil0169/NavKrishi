"use client";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import React from 'react';
import { useRouter } from 'next/navigation';
import ImageSlider from '../components/ImageSlider';
import styles from "./state.module.css"

// Sample states with image URLs (you can replace the URLs with actual images)
const popularCities = [
  { name: 'West Bengal', img: 'kolkata.png' },
  { name: 'Gujarat', img: 'Ahmedabad.png' },
  { name: 'Karnataka', img: 'banglore.png' },
  { name: 'Kerala', img: 'kochi.png' },
  { name: 'Maharashtra', img: 'mumbai.png' },
  { name: 'Punjab', img: 'chandigarh.png' },
  { name: 'Tamil Nadu', img: 'Chennai.png' },
  { name: 'Andhra Pradesh', img: 'delhi.png' },
  { name: 'Assam', img: 'hydrabad.png' },
];

const otherCities = [
  { name: 'Arunachal Pradesh'},
  { name: 'Bihar' },
  { name: 'Chhattisgarh'},
  { name: 'Goa' },
  { name: 'Haryana' },
  { name: 'Himachal Pradesh'},
  { name: 'Jharkhand'},
  { name: 'Madhya Pradesh' },
  { name: 'Manipur' },
  { name: 'Meghalaya' },
  { name: 'Mizoram' },
  { name: 'Nagaland' },
  { name: 'Odisha' },
  { name: 'Rajasthan'},
  { name: 'Sikkim' },
  { name: 'Telangana'},
  { name: 'Tripura'},
  { name: 'Uttar Pradesh' },
  { name: 'Uttarakhand'},
]

const ApiDataPage = () => {
  const router = useRouter();

  // Separate popular cities with images from other cities without images
  // const popularCities = cityImages.slice(0, 10);
  // const otherCities = cityImages.slice(10);

  // Function to navigate to the specific city's page
  const handleCityClick = (city) => {
    router.push(`/state/${city}`);
  };

  return (
    <main>
    <div className={styles.mar}>
      <Navbar/>
      <ImageSlider />
      <h3 className={styles.popularCities}
      >Choose a city to check the prices</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: '40px' }}>
        {popularCities.map((city) => (
          <div
            key={city.name}
            onClick={() => handleCityClick(city.name)}
            style={{ cursor: 'pointer', textAlign: 'center', marginTop: '1px' }}
          >
            <img
              src={city.img}
              alt={city.name}
              style={{ width: '80px', height: '80px', objectFit: 'cover', marginBottom: '10px' }}
            />
            <p className={styles.cityName}>{city.name}</p>
          </div>
        ))}
      </div>

      <h3 className={styles.popularCities}>Other Cities</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {otherCities.map((city) => (
          <div
            key={city.name}
            onClick={() => handleCityClick(city.name)}
            style={{ cursor: 'pointer', margin: '5px 20px 10px 20px', color: '#555' }}
          >
            <p>{city.name}</p>
          </div>
        ))}
      </div>
      </div>
      <Footer/>
      </main>
  );
};

export default ApiDataPage;
