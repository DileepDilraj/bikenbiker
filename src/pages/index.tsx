import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from '../assets/styles/Home.module.css';
import { changeLanguage } from 'i18next';

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

  const changeLanguage = (lang: string) => {
    // Translations (you would expand this with more translations)
const translations = {
  en: {
    signIn: "Continue with Google",
    // ... other translations
  },
  hi: {
    signIn: "Google के साथ जारी रखें",
    // ... other translations
  },
  ru: {
    signIn: "Продолжить с Google",
    // ... other translations
  },
};
  };

  useEffect(() => {
    // Replace with your SheetDB API endpoint
    const url = "https://sheetdb.io/api/v1/687ysmx95i8y9";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Assuming the data is in the format that matches the Product interface
        setProducts(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className={styles.container}>
    <header className={styles.header}>
        <img src="https://www.bikenbiker.com/cdn/shop/files/BnbNew.png" alt="Logo" className={styles.logo} />

        <div className={styles.buttonGroup}>
          <button onClick={() => signIn('google')} className={styles.loginButton}>
            Continue with Google
          </button>

          <button onClick={() => changeLanguage('hi')} className={styles.flagButton}>
            <img  width={50} src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/2560px-Flag_of_India.svg.png" alt="Switch to Hindi" />
          </button>

          <button onClick={() => changeLanguage('ru')} className={styles.flagButton}>
            <img  width={50} src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Flag_of_Russia.svg/640px-Flag_of_Russia.svg.png" alt="Switch to Russian" />
          </button>
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
