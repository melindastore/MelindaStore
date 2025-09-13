import React from 'react';
import { Gem, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent('Olá! Gostaria de mais informações sobre as semi joias da Melinda Store.');
    window.open(`https://wa.me/5573999723147?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Gem className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold">Melinda Store</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Especializada em semi joias delicadas e elegantes que realçam a beleza natural de cada mulher. 
              Cada peça é cuidadosamente selecionada para você se sentir especial.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/storemeelinda"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition-all duration-300 group"
              >
                <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition-all duration-300 group"
              >
                <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <button
                onClick={handleWhatsAppContact}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 group"
              >
                <MessageCircle className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: 'Início', id: 'hero' },
                { name: 'Produtos', id: 'products' },
                { name: 'Depoimentos', id: 'testimonials' },
                { name: 'Contato', id: 'contact' }
              ].map(link => (
                <li key={link.name}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-yellow-600 transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <span>(73) 999723147</span>
              </li>
              <li className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                <span>melindastore2025@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Gem className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Rua Ana Pires Aguiar, 240</p>
                  <p>Centro - Livramento, BA</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Melinda Store. Todos os direitos reservados.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <button
                onClick={handleWhatsAppContact}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Fale Conosco
              </button>
    
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;