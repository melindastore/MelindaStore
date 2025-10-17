import React, { useState } from 'react';
// import { BrowserRouter as Router } from "react-router-dom";

import Header from './components/Header';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminProducts from './components/AdminProducts';
import AdminLogin from './components/AdminLogin';

function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [showLogin, setShowLogin] = useState(false); // 👈 controla exibição

  const handleLogin = (jwt: string) => {
    localStorage.setItem("adminToken", jwt);
    setToken(jwt);
    setShowLogin(false); // fecha login depois que logar
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  if (token) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-between items-center p-4 bg-gray-200">
          <h1 className="text-xl font-bold">Painel Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <AdminProducts />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProductGallery />
      <Testimonials />
      <Contact />
      <Footer onAdminClick={() => setShowLogin(true)} /> {/* 👈 passa função pro footer */}

      {showLogin && ( // 👈 só renderiza se clicar no link
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <AdminLogin onLogin={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
