// src/app/layout.js
import './styles/globals.css';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header>
            <h1>Restaurant Table Booking</h1>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
