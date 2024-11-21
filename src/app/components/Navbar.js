"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Your Firebase auth instance
import styles from "./Navbar.module.css";
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // To toggle the dropdown menu
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleNavigation = (route) => {
    router.push(route);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("You have logged out successfully.");
      router.push("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img
          src="/logo.png"
          alt="Website Logo"
          className={styles.logo}
          onClick={() => handleNavigation("/")}
        />
      </div>
      <div className={styles.navLinks}>
        <button className={styles.navButton} onClick={() => handleNavigation("/about")}>
          About Us
        </button>
        <button className={styles.navButton} onClick={() => handleNavigation("/state")}>
          Live Mandi Prices
        </button>
        <button className={styles.navButton} onClick={() => handleNavigation("/sell")}>
          Sell Crops
        </button>
        <button className={styles.navButton} onClick={() => handleNavigation("/buy")}>
          Buy Crops
        </button>
        <button className={styles.navButton} onClick={() => handleNavigation("/weather")}>
          Crop Recommendations
        </button>
        <button className={styles.navButton} onClick={() => handleNavigation("/contact")}>
          Contact Us
        </button>
      </div>

      {/* User Section */}
      <div className={styles.userSection}>
        {user ? (
          <div className={styles.userMenuContainer}>
            <FaUserCircle
              className={styles.userIcon}
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className={styles.dropdownMenu}>
                <p className={styles.userEmail}>{user.email}</p>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={styles.navButton}
            onClick={() => handleNavigation("/auth/login")}
          >
            Login/SignUp
          </button>
        )}
      </div>

      {/* Social Media Icons */}
      <div className={styles.socialIcons}>
        <FaLinkedin className={styles.icon} />
        <FaInstagram className={styles.icon} />
      
       
      </div>
    </nav>
  );
};

export default Navbar;
