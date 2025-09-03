import React, { useState } from 'react';
import { MessageCircle, Heart, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  rating: number;
}

const ProductGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Anel Delicado Rose Gold',
      price: 'R$ 89',
      image: 'https://tse1.explicit.bing.net/th/id/OIP.TuMK-xpdw0Pz0JGuxg1SPAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      category: 'aneis',
      description: 'Anel delicado folheado a ouro rosé',
      rating: 5
    },
    {
      id: 2,
      name: 'Colar Corrente Feminina',
      price: 'R$ 125',
      image: 'https://www.fashionbubbles.com/wp-content/uploads/2020/11/Como-montar-uma-loja-on-line-de-semijoias-no-atacado.jpg',
      category: 'colares',
      description: 'Colar corrente dourada com pingente coração',
      rating: 5
    },
    {
      id: 3,
      name: 'Brincos Argola Minimalista',
      price: 'R$ 65',
      image: 'https://tse1.explicit.bing.net/th/id/OIP.qA5J6V2C11oT5oLClYCHugHaJ3?rs=1&pid=ImgDetMain&o=7&rm=3',
      category: 'brincos',
      description: 'Brincos argola pequena folheados a ouro',
      rating: 4
    },
    {
      id: 4,
      name: 'Pulseira Charm Feminina',
      price: 'R$ 95',
      image: 'https://http2.mlstatic.com/D_NQ_NP_912894-MLB54762584495_032023-O.webp',
      category: 'pulseiras',
      description: 'Pulseira com charms delicados dourada',
      rating: 5
    },
    {
      id: 5,
      name: 'Anel Solitário Elegante',
      price: 'R$ 110',
      image: 'https://tse3.mm.bing.net/th/id/OIP.7u128-2CmWB7fWnE19ltAAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      category: 'aneis',
      description: 'Anel solitário com zircônia cravada',
      rating: 5
    },
    {
      id: 6,
      name: 'Colar Choker Moderno',
      price: 'R$ 78',
      image: 'https://tse1.explicit.bing.net/th/id/OIP.8YCwUGTqwQBXKAnYLAJ0MAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      category: 'colares',
      description: 'Choker moderno folheado a ouro',
      rating: 4
    },
    {
      id: 6,
      name: 'Colar Choker Moderno',
      price: 'R$ 78',
      image: 'https://tse1.explicit.bing.net/th/id/OIP.8YCwUGTqwQBXKAnYLAJ0MAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      category: 'colares',
      description: 'Choker moderno folheado a ouro',
      rating: 4
    }

  ];

  const categories = [
    { id: 'all', name: 'Todos os Produtos' },
    { id: 'aneis', name: 'Anéis' },
    { id: 'colares', name: 'Colares' },
    { id: 'brincos', name: 'Brincos' },
    { id: 'pulseiras', name: 'Pulseiras' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleWhatsAppContact = (product: Product) => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${product.name} - ${product.price}. Gostaria de mais informações.`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossa Coleção
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada peça é cuidadosamente selecionada e crafted para refletir elegância e sofisticação
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-rose-50 hover:text-rose-500 shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-all duration-300"
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors duration-300 ${
                      favorites.includes(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-600'
                    }`} 
                  />
                </button>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.rating 
                            ? 'text-rose-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-rose-600">
                    {product.price}
                  </span>
                  <button
                    onClick={() => handleWhatsAppContact(product)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;