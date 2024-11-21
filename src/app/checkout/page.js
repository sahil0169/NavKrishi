"use client";
import { useState, useEffect } from "react";

import styles from "./checkout.module.css"; // Import CSS module
import Navbar from "../components/Navbar";
import Link from "next/link";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bank, setBank] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handlePlaceOrder = () => {
    if (!address || !paymentMethod || (paymentMethod === "NetBanking" && !bank)) {
      alert("Please fill in all required fields before placing your order.");
      return;
    }

    setOrderPlaced(true);
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const expectedDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today.setDate(today.getDate() + 7));
    return deliveryDate.toLocaleDateString();
  };

  if (orderPlaced) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.orderSummary}>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. Your items will be delivered to:</p>
          <p className={styles.address}>{address}</p>
          <p>
            Expected Delivery Date:{" "}
            <span className={styles.date}>{expectedDeliveryDate()}</span>
          </p>
          <Link href="/" className={styles.homeButton}>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.checkout}>


        <div className={styles.section}>
          <h3>Delivery Address</h3>
          <textarea
            className={styles.textarea}
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className={styles.section}>
          <h3>Payment Method</h3>
          <div className={styles.paymentOptions}>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit or Debit Card
              <div className={styles.cardLogos}>
                <img src="/visa.png" alt="Visa" />
                <img src="/mastercard.png" alt="MasterCard" />
                <img src="/amex.png" alt="American Express" />
                <img src="/maestro.png" alt="Maestro" />
                <img src="/rupay.png" alt="RuPay" />
              </div>
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="NetBanking"
                checked={paymentMethod === "NetBanking"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
                          Net Banking
                      <br></br>
              {paymentMethod === "NetBanking" && (
                <select
                  className={styles.select}
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                >
                  <option value="">Choose an Option</option>
                  <option value="SBI">State Bank of India</option>
<option value="PNB">Punjab National Bank</option>
<option value="BoB">Bank of Baroda</option>
<option value="Canara">Canara Bank</option>
<option value="Union">Union Bank of India</option>
<option value="IndianBank">Indian Bank</option>
<option value="BoI">Bank of India</option>
<option value="Central">Central Bank of India</option>
<option value="UCO">UCO Bank</option>
<option value="IOB">Indian Overseas Bank</option>
<option value="PunjabSind">Punjab & Sind Bank</option>
<option value="BoM">Bank of Maharashtra</option>
<option value="HDFC">HDFC Bank</option>
<option value="ICICI">ICICI Bank</option>
<option value="Axis">Axis Bank</option>
<option value="Kotak">Kotak Mahindra Bank</option>
<option value="YesBank">Yes Bank</option>
<option value="IndusInd">IndusInd Bank</option>
<option value="IDFC">IDFC FIRST Bank</option>
<option value="Federal">Federal Bank</option>
<option value="RBL">RBL Bank</option>
<option value="SouthIndian">South Indian Bank</option>
<option value="DCB">DCB Bank</option>
<option value="KarurVysya">Karur Vysya Bank</option>
<option value="TMB">Tamilnad Mercantile Bank</option>
<option value="Bandhan">Bandhan Bank</option>
<option value="JandK">Jammu & Kashmir Bank</option>
<option value="AU">AU Small Finance Bank</option>
<option value="Equitas">Equitas Small Finance Bank</option>
<option value="Jana">Jana Small Finance Bank</option>
<option value="Ujjivan">Ujjivan Small Finance Bank</option>
<option value="Suryoday">Suryoday Small Finance Bank</option>
<option value="ESAF">ESAF Small Finance Bank</option>
<option value="Fincare">Fincare Small Finance Bank</option>
<option value="AirtelPayments">Airtel Payments Bank</option>
<option value="IndiaPost">India Post Payments Bank</option>
<option value="PaytmPayments">Paytm Payments Bank</option>
<option value="Citi">Citibank</option>
<option value="HSBC">HSBC</option>
<option value="StandardChartered">Standard Chartered Bank</option>
<option value="Deutsche">Deutsche Bank</option>
<option value="DBS">DBS Bank</option>
<option value="Barclays">Barclays Bank</option>
<option value="Saraswat">Saraswat Bank</option>
<option value="SVC">Shamrao Vithal Cooperative (SVC) Bank</option>
<option value="Cosmos">Cosmos Cooperative Bank</option>
<option value="BharatCooperative">Bharat Cooperative Bank</option>
<option value="TJSB">TJSB Sahakari Bank</option>
<option value="PrathamaUP">Prathama UP Gramin Bank</option>
<option value="KarnatakaGramin">Karnataka Gramin Bank</option>
<option value="BarodaRajasthan">Baroda Rajasthan Kshetriya Gramin Bank</option>
<option value="APGrameenaVikas">Andhra Pradesh Grameena Vikas Bank</option>
<option value="KeralaGramin">Kerala Gramin Bank</option>

                </select>
              )}
                      </label>
                      
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash On Delivery/Pay on delivery
            </label>
          </div>
        </div>

        <div className={styles.section}>
                  <h3>Items in Cart</h3>
                  <div className={styles.cartItem1}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
                
                <div key={index} className={styles.cartItem}>
                    <div><img 
                  src={`/${item.cropName}.jpg`} 
                  alt={item.cropName} 
                  className={styles.cropImg}
                    />
                    </div>
                    <div className={styles.cropDetails}>
                <h4>{item.cropName}</h4>
                <p>Quantity: {item.quantity} kg</p>
                        <p>Price: ₹{(item.quantity * item.price).toFixed(2)}</p>
                        <p>Total Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
                      )}
                      </div>
        </div>

        <div className={styles.placeOrderContainer}>
  <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
    Place your order
  </button>
  <p className={styles.orderTotal}>
    Order Total: ₹
    {cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)}
  </p>
</div>     
              
      </div>
    </div>
  );
};

export default CheckoutPage;
