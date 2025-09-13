import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Olá! Gostaria de conhecer mais sobre suas joias.');
    window.open(`https://wa.me/73999723147?text=${message}`, '_blank');
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900/80 via-pink-900/80 to-purple-900/80 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <Sparkles className="h-16 w-16 text-rose-400 mx-auto mb-4 animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Semi Joias que 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">
            {' '}Realçam
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            sua Beleza
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Descubra nossa coleção exclusiva de semi joias delicadas, criadas especialmente para realçar a beleza única de cada mulher.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleWhatsAppContact}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:from-rose-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Fale Conosco no WhatsApp
          </button>
          
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            Ver Produtos
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-rose-400 rounded-full animate-ping" />
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-pink-400 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-white rounded-full animate-ping" />
    </section>
  );
};

export default Hero;