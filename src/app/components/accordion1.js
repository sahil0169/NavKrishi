// src/app/components/accordion.js
import styles from "./accordion.module.css";

const accordionData = [
  {
    title: "Input Retailers",
    description: "Discover how technology is transforming agriculture to boost productivity and sustainability.",
    imageUrl: "/acr1.jpg",
  },
  {
    title: "Framers",
    description: "Get the latest market trends and insights to make informed decisions in the agri sector.",
    imageUrl: "/acr2.jpg",
  },
  {
    title: "Prodction Traders",
    description: "Learn about eco-friendly practices that help preserve our planet for future generations.",
    imageUrl: "/acr3.jpg",
  },
  {
    title: "Consumption Traders",
    description: "Learn about eco-friendly practices that help preserve our planet for future generations.",
    imageUrl: "/acr4.jpg",
  },
  {
    title: "Wholesalers",
    description: "Learn about eco-friendly practices that help preserve our planet for future generations.",
    imageUrl: "/acr5.jpg",
  },
  {
    title: "Retailers",
    description: "Learn about eco-friendly practices that help preserve our planet for future generations.",
    imageUrl: "/acr6.jpg",
  },
  {
    title: "Importers",
    description: "Learn about eco-friendly practices that help preserve our planet for future generations.",
    imageUrl: "/acr7.jpg",
  },
  {
    title: "Exporters",
    description: "Learn about eco-friendly practices that help preserve our planet for future generations.",
    imageUrl: "/acr8.jpg",
  }
];

const Accordion = () => {
  return (
    <div className={styles.bottom}>
      <div className={styles.textContainer}>
          <h1 className={styles.title1}> Empowering every link</h1>
          <div className={styles.colorLine}></div>
         <p className={styles.description}>
          At each stage of the pre and post harvest journey, our solutions are crafted to simplify business challenges. 
          </p>

        <p className={styles.description}>
        We mitigate payment risks, maintain quality standards, smoothen the logistics experience, and distribute real-time information. Our products are accessible to all, helping businesses become dependable and trustworthy to one another. </p>
        <p className={styles.description}>
        Our ultimate goal is to ensure seamless trade of fresh produce from point to point, both locally and globally. 
          </p>  
        {/* <button className={styles.aboutButton} onClick={goToAboutPage}>Read About Us</button> */}
        </div>
    <div className={styles.accordion}>
      {accordionData.map((item, index) => (
        <div
          key={index}
          className={styles.accordionItem}
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        >
          <div className={styles.overlay}></div>
          <div className={styles.title}>{item.title}</div>
         
        </div>
      ))}
      </div>
      </div>
  );
};

export default Accordion;
