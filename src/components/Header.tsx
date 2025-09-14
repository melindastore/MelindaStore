import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // ícones
import logo from '../assets/logoMelin2.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-700 via-pink-650 to-purple-700 bg-opacity-90 text-white z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-1">
        {/* Logo */}
        <img src={logo} alt="Logo Melinda Store" className="w-20 h- 20 object-contain  m-0 p-0" 
  />
        <h1 className="text-2xl font-bold tracking-wide">
            Melinda Store
        </h1>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#hero"  className="block hover:text-pink-300 transition">Inicio</a>
          <a href="#products" className="block hover:text-pink-300 transition">Produtos</a>
          <a href="#contact" className="block hover:text-pink-300 transition">Contato</a>
          <a href="#testimonials" className="block hover:text-pink-300 transition">Depoimentos</a>
        </nav>

        {/* Botão menu mobile */}
        <button 
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-pink-700 to-purple-800 p-4 space-y-4 text-center">
          <a href="#hero"  className="block hover:text-pink-300 transition">Inicio</a>
          <a href="#products" className="block hover:text-pink-300 transition">Produtos</a>
          <a href="#contact" className="block hover:text-pink-300 transition">Contato</a>
          <a href="#testimonials" className="block hover:text-pink-300 transition">Depoimentos</a>
          
        </div>
      )}
    </header>
  );
}
