import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Import the main application component
import "./index.css"; // Import global styles
import { AuthProvider } from "./context/AuthContext.jsx"; // Import authentication context provider
import { Elements } from "@stripe/react-stripe-js"; // Import Stripe Elements component for Stripe integration
import { loadStripe } from "@stripe/stripe-js"; // Import function to load Stripe
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing
import { Provider } from "react-redux";

// Initialize Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51QhvWdG6MURsBmOTtsys8gHQRsi5zEh0VspJkpXAaAUqUrIxSuu5o1LhZSe1AdjZEAHQrzioqQZP8hEL0JioHfZQ00YTqgP2lV"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);
