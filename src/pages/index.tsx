import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { signInWithGoogle } from '../firebase/auth';
import styles from '../assets/styles/Home.module.css';

// Define the structure of your product data
interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'hi' for Hindi

  useEffect(() => {
    const apiUrl = language === 'en' 
      ? "https://sheetdb.io/api/v1/687ysmx95i8y9" 
      : "https://sheetdb.io/api/v1/1gjhn2ruw1r25";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [language]);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error: any) => {
      console.error('Sign out error:', error);
    });
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="https://www.bikenbiker.com/cdn/shop/files/BnbNew.png" alt="Logo" className={styles.logo} />
        <div className={styles.buttonGroup}>
          <button onClick={() => handleLanguageChange('hi')} className={styles.languageButton}>
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/india-flag-icon.png" alt="Hindi" />
             
          </button>
          <button onClick={() => handleLanguageChange('en')} className={styles.languageButton}>
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/united-states-flag-icon.png" alt="English" />
             
          </button>
          {user ? (
            <button onClick={handleSignOut} className={styles.googleSignInButton}>
              <img src="https://icon-library.com/images/icon-logout/icon-logout-13.jpg" alt="Logout" className={styles.googleIcon} />
              Logout from {user.displayName?.split(' ')[0] ?? 'User'}
            </button>
          ) : (
            <button onClick={signInWithGoogle} className={styles.googleSignInButton}>
              <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google sign-in" className={styles.googleIcon} />
              Sign in with Google
            </button>
          )}
        </div>
      </header>

      <main className={styles.main}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
