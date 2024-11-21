"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import styles from './CropForm.module.css';
import Navbar from "./Navbar";
const CropForm = () => {
  const [Commission, setCommission] = useState("");
  const [Exporter, setExporter] = useState("");
  const [Farmer, setFarmer] = useState("");
  const [Miller, setMiller] = useState("");
  const [Retail, setRetail] = useState(""); // Image state
  const [Trader, setTrader] = useState("");
 const [Wholesaler, setWholesaler] = useState("");
    const [Other, setOther] = useState("");
const [message, setMessage] = useState("");
  // Handle image change
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!image) {
    //   setMessage("Please upload an image of the crop.");
    //   return;
    // }
    try {
      // 1. Upload image to Firebase Storage
    //   const imageRef = ref(storage, `FarmerDetails/${image.name}`);
    //   await uploadBytes(imageRef, image);
    //   const imageUrl = await getDownloadURL(imageRef);

      // 2. Save crop details along with image URL to Firestore
      await addDoc(collection(db, "FarmerDetail"), {
        Commission,
        Exporter,
        Farmer,
        Miller,
        Other, // Store image URL in Firestore
        Retail,
        Trader,
        Wholesaler
      });

     setMessage("Crop details submitted successfully!");
      // Clear form
      setCommission("");
      setExporter("");
      setFarmer("");
      setMiller("");
        setRetail("");
        setTrader("");
        setWholesaler("");
        setOther("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage(`Failed to submit crop: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
    <Navbar/>
      <div >
        <h1 className={styles.heading}>Please enter Variety and Price</h1>
        <p className={styles.subheading}>(Optional)</p>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Trader/Aadat"
              value={Trader}
              onChange={(e) => setTrader(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Commission Agent/Loader/Broker"
              value={Commission}
              onChange={(e) => setCommission(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Cold Storage / Washing Centre / Broker"
              value={Miller}
              onChange={(e) => setMiller(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          
                  
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Exporter/Impoter"
              value={Exporter}
              onChange={(e) => setExporter(e.target.value)}
              className={styles.input}
              required
            />
          </div>    

          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Wholesaler"
              value={Wholesaler}
              onChange={(e) => setWholesaler(e.target.value)}
              className={styles.input}
              required
            />
          </div>        
          
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Retail/Kirana Store"
              value={Retail}
              onChange={(e) => setRetail(e.target.value)}
              className={styles.input}
              required
            />
         </div>     

         <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Farmer"
              value={Farmer}
              onChange={(e) => setFarmer(e.target.value)}
              className={styles.input}
              required
            />
        </div>
                  
        <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Other"
              value={Other}
              onChange={(e) => setOther(e.target.value)}
              className={styles.input}
              required
            />
          </div>
        <button type="submit" className={styles.input1}>Submit</button>
              </form>
              {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>

  );
};

export default CropForm;
