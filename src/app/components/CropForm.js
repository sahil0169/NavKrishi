"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import styles from './CropForm.module.css';

const CropForm = () => {
  const router = useRouter();
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
 // const [image, setImage] = useState(null); // Image state
  const [message, setMessage] = useState("");

  // Handle image change
  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!image) {
    //   setMessage("Please upload an image of the crop.");
    //   return;
    // }
    try {
      // 1. Upload image to Firebase Storage
      // const imageRef = ref(storage, `cropImages/${image.name}`);
      // await uploadBytes(imageRef, image);
      // const imageUrl = await getDownloadURL(imageRef);

      // 2. Save crop details along with image URL to Firestore
      await addDoc(collection(db, "crops"), {
        cropName,
        quantity,
        price,
        location,
        // imageUrl, // Store image URL in Firestore
        createdAt: new Date(),
      });

      setMessage("Crop details submitted successfully!");
      router.push("/components");
      // Clear form
      setCropName("");
      setQuantity("");
      setPrice("");
      setLocation("");
      // setImage(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage(`Failed to submit crop: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div >
        <h1 className={styles.heading}>Please enter Variety and Price</h1>
        <p className={styles.subheading}>(Optional)</p>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Enter variety name"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.input}
              required
            />
            <span className={styles.unitButton}>kg</span>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={styles.input}
              required
            />
            <span className={styles.unitButton}>₹/kg</span>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
              required
            />
          </div>
{/* 
          <div className={styles.fileInputWrapper}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
              
            />

          </div> */}

          <button type="submit" className={styles.input1}>Submit</button>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>

  );
};

export default CropForm;
