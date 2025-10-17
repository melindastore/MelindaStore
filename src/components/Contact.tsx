import React, { useState } from 'react';
import { MessageCircle, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Olá! Gostaria de mais informações sobre as semi joias da Melinda Store. Meu nome é ${formData.name || '[Nome]'}.`
    );
    window.open(`https://wa.me/5573999723147?text=${message}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name && formData.email && formData.message) {
      const message = encodeURIComponent(
        `Olá! Meu nome é ${formData.name}. Email: ${formData.email}. Mensagem: ${formData.message}`
      );
      window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
      
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estamos aqui para ajudar você a encontrar a joia perfeita
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                  placeholder="Digite seu nome"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Como podemos ajudar você?"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-4 px-6 rounded-lg hover:from-rose-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Send className="inline mr-2 h-5 w-5" />
                Enviar via WhatsApp
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <button
                onClick={handleWhatsAppContact}
                className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="inline mr-2 h-5 w-5" />
                Falar Diretamente no WhatsApp
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Telefone</h4>
                    <p className="text-gray-300">(73) 999723147</p>
                    <p className="text-sm text-gray-400">WhatsApp disponível</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">E-mail</h4>
                    <p className="text-gray-300">melindastore2025@gmail.com</p>
                    <p className="text-sm text-gray-400">Respondemos em até 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Endereço</h4>
                    {/* <p className="text-gray-300">Rua Ana pires Aguiar, 240</p> */}
                    <p className="text-gray-300">Centro - Livramento, BA</p>
                    <p className="text-sm text-gray-400">CEP: 46140-000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Horário de Funcionamento</h4>
                    <p className="text-gray-300">Segunda a Sexta: 9h às 18h</p>
                    <p className="text-gray-300">Sábado: 9h às 16h</p>
                    <p className="text-gray-300">Domingo: Fechado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
              <h4 className="font-semibold text-lg mb-4">Nossa Localização</h4>
              <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-rose-500 mx-auto mb-2" />
                  <p className="text-gray-300">Mapa interativo</p>
                  <p className="text-sm text-gray-400">Clique para abrir no Google Maps</p>
                

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;