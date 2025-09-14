import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Star } from 'lucide-react';

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
}

const ProductGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url =
          selectedCategory === 'all'
            ? 'https://backendmelinda.onrender.com/produtos'
            : `https://backendmelinda.onrender.com/produtos/${selectedCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', name: 'Todos os Produtos' },
    { id: 'aneis', name: 'Anéis' },
    { id: 'colares', name: 'Colares' },
    { id: 'brincos', name: 'Brincos' },
    { id: 'pulseiras', name: 'Pulseiras' }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const handleWhatsAppContact = (product: Product) => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${product.nome} - R$ ${product.preco}.`
    );
    window.open(`https://wa.me/5573999723147?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 bg-gray-50" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossa Coleção
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-500 shadow-md'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Carregando produtos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(prod => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={prod.imagem}
                    alt={prod.nome}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button
                    onClick={() => toggleFavorite(prod.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-all duration-300"
                  >
                    <Heart
                      className={`h-5 w-5 transition-colors duration-300 ${
                        favorites.includes(prod.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                    {prod.nome}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{prod.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-rose-600">R$ {prod.preco}</span>
                    <button
                      onClick={() => handleWhatsAppContact(prod)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" /> Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;



