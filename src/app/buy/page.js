"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase auth
import { auth } from "../firebase/firebase"; // Your Firebase auth instance
import styles from "./buyers.module.css"; // Import CSS module
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from 'next/navigation';

// Notification Component
const Notification = ({ message, onClose }) => (
  <div className={styles.notification}>
    {message}
    <button onClick={onClose} className={styles.closeNotificationButton}>✕</button>
  </div>
);

const BuyersPage = () => {
  const router = useRouter();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState("");
  const [cropNameFilter, setCropNameFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState(null); // Notification state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Alert state
  const [loadingAuth, setLoadingAuth] = useState(true);

  const goToCheckPage = () => {
    router.push('/checkout');
  };

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart items to localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Check user authentication status
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
      setLoadingAuth(false);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [router]);

  // Fetch crops from Firestore
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const cropsCollection = collection(db, "crops");
        const cropSnapshot = await getDocs(cropsCollection);
        const cropList = cropSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCrops(cropList);
      
      } catch (error) {
        console.error("Error fetching crops: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  const addToCart = (crop) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === crop.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === crop.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...crop, quantity: 1 }];
      }
    });
    showNotification(`${crop.cropName} added to cart`);
  };

  const increaseQuantity = (cropId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cropId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (cropId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === cropId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (loadingAuth || loading) {
    return <p>Loading...</p>; // Show a loader while checking authentication and fetching data
  }

  const filteredCrops = crops.filter((crop) => {
    const matchesLocation = crop.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesCropName = crop.cropName.toLowerCase().includes(cropNameFilter.toLowerCase());
    const matchesMinPrice = minPrice === "" || crop.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === "" || crop.price <= parseFloat(maxPrice);

    return matchesLocation && matchesCropName && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className={styles.container}>
      {showAlert && (
        <div className={styles.alert}>
          You must be logged in to access this page!
        </div>
      )}
     
      <Navbar />
      <div className={showAlert ? styles.hazy : ""}>
        {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
        
        <button className={styles.cartButton} onClick={toggleCart}>My Cart</button>

        <div className={`${styles.cartSidebar} ${cartOpen ? styles.open : ""}`}>
          <button className={styles.closeButton} onClick={toggleCart}>×</button>
          <h2>My Cart</h2>
          {cart.length > 0 ? (
            <div>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div>
                    <img 
                      src={`/${item.cropName}.jpg`} 
                      alt={item.cropName} 
                      className={styles.cropImg}
                    />
                  </div>
                  <div className={styles.cropDetails}>
                    <h3>{item.cropName}</h3>
                    <p>Price per kg: ₹{item.price}</p>
                    <p>Total Quantity: {item.quantity} kg</p>
                    <p>Total Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
                    <div className={styles.quantityControls}>
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity} kg</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.cartTotal}>
                <span>Total:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={goToCheckPage}
              >
                Checkout
              </button>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Location</label>
            <input
              type="text"
              placeholder="Filter by location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Crop Name</label>
            <input
              type="text"
              placeholder="Filter by crop name"
              value={cropNameFilter}
              onChange={(e) => setCropNameFilter(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Min Price</label>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.label}>Max Price</label>
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        {/* Crop Marketplace */}
        <div className={styles.marketplaceHeader}>
          <h3 className={styles.mainTitle}>Best Marketplace For Farmers In India</h3>
          <h4 className={styles.subTitle}>Sell Spices, Fruits, Vegetables, Fertilizers, Agro Chemicals and other agricultural products.</h4>
          <h5 className={styles.tagline}>Online Farmers Market</h5>
        </div>

        <div className={styles.grid}>
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <div key={crop.id} className={styles.card}>
                <img
                  src={`/${crop.cropName}.jpg`}
                  alt={crop.cropName}
                  className={styles.image}
                  onError={(e) => {
                    e.target.src = "/default.jpg"; // Replace with the path to your alternate image
                  }}
                />
                <h2 className={styles.title}>{crop.cropName.toLowerCase()}</h2>
                <p>Quantity: {crop.quantity} kg</p>
                <p>Price: ₹{crop.price} per kg</p>
                <p>Location: {crop.location}</p>
                <p>
                 Posted on:{" "}
                  {new Date(crop.createdAt.seconds * 1000).toLocaleDateString("en-GB", {
                   day: "2-digit",
                    month: "long",
                     year: "numeric",
                   })}
                 </p>

              
                <button onClick={() => addToCart(crop)} className={styles.addToCartButton}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No crops available for sale.</p>
          )}
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default BuyersPage;
