import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminProducts from './components/AdminProducts';
import AdminLogin from './components/AdminLogin';

function App() {
  // guarda o token do admin
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  // função passada para o login
  const handleLogin = (jwt: string) => {
    localStorage.setItem("adminToken", jwt);
    setToken(jwt);
  };

  // logout do admin
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  // se estiver logado como admin, mostra o painel admin
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

  // se não estiver logado, mostra o site normal e login do admin
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProductGallery />
      <Testimonials />
      <Contact />
      <Footer />
      <AdminLogin onLogin={handleLogin} />
    </div>
  );
}

export default App;
