// src/app/auth/login/page.js
"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to home page after successful login
    router.push("/");
  };

  return (
    <div >
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Website Logo" className={styles.logo} onClick={() => handleNavigation('/')}/>
      </div>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
      <p className={styles.bg}>New to NavKrishi?</p>
      <p className={styles.signupPrompt}>
  Don’t have an account? <Link href="/auth/signup" className={styles.signupLink}>Sign up</Link>
</p>
    </div>
  );
};

export default LoginPage;
