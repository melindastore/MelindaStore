import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-600 via-pink-600 to-purple-900 bg-opacity-90 text-white z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo / Nome da loja */}
        <h1 className="text-2xl font-bold tracking-wide">
          Melinda Store
        </h1>

        {/* Navegação */}
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#produtos" className="hover:text-pink-300 transition">
            Produtos
          </a>
          <a href="#contato" className="hover:text-pink-300 transition">
            Contato
          </a>
          <a href="#sobre" className="hover:text-pink-300 transition">
            Sobre Nós
          </a>
          <a href="https://www.instagram.com/storemeelinda?igsh=MWpjcnFtZjBmOWp0bA==" className="hover:text-pink-300 transition">
            Rede Social
          </a>
        </nav>
      </div>
    </header>
  );
}
