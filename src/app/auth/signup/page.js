// src/app/auth/signup/page.js
"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./signup.module.css"

const SignupPage = () => {
  const router = useRouter();

  const handleSignup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    // Redirect to login page after successful signup
    router.push("/auth/login");
  };

  return (
    <div>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Website Logo" className={styles.logo} onClick={() => handleNavigation('/')}/>
      </div>
      <AuthForm onSubmit={handleSignup} buttonText="Signup" />
      <p className={styles.signupPrompt}>
  Already have an account? <Link href="/auth/login" className={styles.signupLink}>Log In</Link>
</p>
    </div>
  );
};

export default SignupPage;
