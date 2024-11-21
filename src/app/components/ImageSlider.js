// components/ImageSlider.js
import { useState, useEffect } from 'react';
import styles from './ImageSlider.module.css';

const images = [
    'img1.png', // Replace with your image paths
    'img2.png',
    'img3.png',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={styles.slider}>
      <div className={styles.sliderImage}>
        <img src={images[currentIndex]} alt="slider image" />
      </div>
    </div>
  );
};

export default ImageSlider;
