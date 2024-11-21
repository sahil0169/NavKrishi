"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Import your Firebase auth instance
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./about.module.css";

export default function About() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setShowAlert(true); // Trigger the alert
          setTimeout(() => {
            router.push("/auth/login"); // Redirect after delay
          }, 3000); // Adjust delay as needed (3 seconds here)
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loader while checking auth
  }

  return (
    <main>
      <Navbar />
      <div className={showAlert ? styles.hazy : ""}>
        <div className={styles.imageContainer}>
          <img
            src="/about1.png" // Image located in the "public" folder
            alt="Sample Image"
            className={styles.image}
          />
          <img
            src="/about2.png" // Image located in the "public" folder
            alt="Sample Image"
            className={styles.image1}
          />
          <img
            src="/about3.png" // Image located in the "public" folder
            alt="Sample Image"
            className={styles.image1}
          />
        </div>
      </div>
      <Footer />
      {showAlert && <div className={styles.alert}>You must be logged in to view this page!</div>}
    </main>
  );
}
