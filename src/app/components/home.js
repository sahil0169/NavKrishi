import { useRouter } from 'next/navigation';
import styles from './home.module.css';

const Home = () => {
  const router = useRouter();

  // Function to navigate to the About page
  const goToAboutPage = () => {
    router.push('/about');
  };

  return (
    <main>
    <div className={styles.container}>
      {/* Top Section - Image */}
      <div className={styles.imageContainer}>
        <img
          src="/1.png" // Image located in the "public" folder
          alt="Sample Image"
          className={styles.image}
        />
      </div>

      {/* Bottom Section - Text and Video Side by Side */}
      <div className={styles.bottomSection}>
        {/* Left Section - Text Content */}
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Building trusted paths of growth for every agri citizen</h1>
          <div className={styles.colorLine}></div>
          <p className={styles.description}>
            For almost a decade, we have been focused on transforming the agri ecosystem.
          </p>
          
          <p className={styles.description}>
          By harnessing technology and innovation, we create products and services that help small businesses grow across the value chain. 
          </p>

         <p className={styles.description}> Our solutions empower farmers and entrepreneurs to maximize their potential, ensuring sustainable growth and enhanced livelihoods. Together, we’re building a resilient agricultural future for communities worldwide. </p>
          <button className={styles.aboutButton} onClick={goToAboutPage}>Read About Us</button>
        </div>

        {/* Right Section - Video */}
        <div className={styles.videoContainer}>
  <video 
    className={styles.video} 
    loop 
    autoPlay 
    muted 
    playsInline
  >
    <source src="/2video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

      </div>
      </div>
      </main>
  );
};

export default Home;
