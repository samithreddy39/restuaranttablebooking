// src/app/page.js
import Link from 'next/link';  // To enable navigation between pages
import './styles/home.css';     // Custom CSS for the home page styling

export default function HomePage() {
  return (
    <div className="home-page">
      <h2>Welcome to Our Restaurant</h2>
      <p>Enjoy a wonderful dining experience. Book your table easily with us!</p>
      
      <Link href="/booking">
        <button className="book-now-btn">Book Now</button>
      </Link>
    </div>
  );
}
