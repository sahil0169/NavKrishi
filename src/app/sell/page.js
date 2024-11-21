"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Your Firebase auth instance
import CropForm from "../components/CropForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styles from "./SellPage.module.css"; // Add this CSS file for styling

const SellPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setShowAlert(true); // Show alert when user is not authenticated
        setTimeout(() => {
          router.push("/auth/login"); // Redirect to login page after 3 seconds
        }, 3000); // 3-second delay
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loader while checking authentication
  }

  return (
    <>
      {showAlert && (
        <div className={styles.alert}>You must be logged in to access this page!</div>
      )}
      
      <Navbar />
      <div className={showAlert ? styles.hazy : ""}>
        <CropForm />
        <Footer />
      </div>
    </>
  );
};

export default SellPage;
