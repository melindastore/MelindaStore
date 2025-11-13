import React, { useState, useEffect } from "react";
import { Star, Quote, Send, User, Check, Trash } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const API_BASE = "https://seu-servidor.onrender.com"; // 🔧 ajuste para sua URL real

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // ============================
  // 🔹 CARREGA DEPOIMENTOS
  // ============================
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const endpoint = isAdmin ? "/admin/testimonials" : "/testimonials";
        const res = await fetch(`${API_BASE}${endpoint}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Erro ao carregar depoimentos:", err);
      }
    };

    fetchTestimonials();
  }, [isAdmin, token]);

  // ============================
  // 🔹 ENVIAR NOVO DEPOIMENTO
  // ============================
  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.comment.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimonial),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao enviar depoimento");

      alert("✅ Obrigado! Seu depoimento será analisado e publicado em breve.");
      setNewTestimonial({ name: "", rating: 5, comment: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar seu depoimento. Tente novamente.");
    }
  };

  // ============================
  // 🔹 APROVAR DEPOIMENTO (ADMIN)
  // ============================
  const handleVerify = async (id: number) => {
    if (!token) return alert("Você precisa estar logado como admin!");
    try {
      const res = await fetch(`${API_BASE}/testimonials/${id}/verify`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao aprovar depoimento");
      alert("Depoimento aprovado!");
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, verified: true } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ============================
  // 🔹 EXCLUIR DEPOIMENTO (ADMIN)
  // ============================
  const handleDelete = async (id: number) => {
    if (!token) return alert("Você precisa estar logado como admin!");
    if (!confirm("Tem certeza que deseja excluir este depoimento?")) return;

    try {
      const res = await fetch(`${API_BASE}/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao excluir depoimento");
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================== HEADER ===================== */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A satisfação dos nossos clientes é nossa maior conquista
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-300 shadow-md"
            >
              <Send className="mr-2 h-5 w-5" />
              Deixar Depoimento
            </button>
          </div>
        </div>

        {/* ===================== FORM ===================== */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-12 bg-gray-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Compartilhe sua Experiência
            </h3>

            <form onSubmit={handleSubmitTestimonial} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seu Nome
                </label>
                <input
                  type="text"
                  value={newTestimonial.name}
                  onChange={(e) =>
                    setNewTestimonial((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Digite seu nome"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avaliação
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewTestimonial((prev) => ({ ...prev, rating: star }))
                      }
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= newTestimonial.rating
                            ? "text-rose-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seu Comentário
                </label>
                <textarea
                  value={newTestimonial.comment}
                  onChange={(e) =>
                    setNewTestimonial((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  placeholder="Conte sobre sua experiência conosco..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg hover:from-rose-400 hover:to-pink-400 transition-all font-medium"
              >
                Enviar Depoimento
              </button>
            </form>
          </div>
        )}

        {/* ===================== LISTA DE DEPOIMENTOS ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    {t.verified ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Verificado
                      </span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        Aguardando
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < t.rating
                            ? "text-rose-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      {new Date(t.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute top-0 left-0 h-8 w-8 text-rose-400 opacity-20 -translate-y-2" />
                <p className="text-gray-700 leading-relaxed italic pl-6">
                  "{t.comment}"
                </p>
              </div>

              {isAdmin && (
                <div className="flex gap-3 mt-6">
                  {!t.verified && (
                    <button
                      onClick={() => handleVerify(t.id)}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      <Check className="h-4 w-4" /> Aprovar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    <Trash className="h-4 w-4" /> Excluir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;








// import React, { useState } from 'react';
// import { Star, Quote, Send, User } from 'lucide-react';

// interface Testimonial {
//   id: number;
//   name: string;
//   rating: number;
//   comment: string;
//   date: string;
//   verified: boolean;
// }

// const Testimonials: React.FC = () => {
//   const [testimonials, setTestimonials] = useState<Testimonial[]>([
//     {
//       id: 1,
//       name: 'Ana Carolina',
//       rating: 5,
//       comment: 'Apaixonada pelas semi joias da Melinda Store! São lindas, delicadas e com ótima qualidade. O anel que comprei não sai do meu dedo!',
//       date: '2024-12-15',
//       verified: true
//     },
//     {
//       id: 2,
//       name: 'Sabrina Santos',
//       rating: 5,
//       comment: 'Comprei um colar para minha formatura e ficou perfeito! As semi joias da Melinda são lindas e com preço justo. Super recomendo!',
//       date: '2024-12-10',
//       verified: true
//     },
//     {
//       id: 3,
//       name: 'Roberta Lima',
//       rating: 4,
//       comment: 'As semi joias são lindas e delicadas! Comprei vários brincos e todos são de ótima qualidade. Atendimento nota 10!',
//       date: '2024-12-08',
//       verified: true
//     },
//     {
//       id: 4,
//       name: 'Juliana Costa',
//       rating: 5,
//       comment: 'Atendimento maravilhoso! Me ajudaram a escolher as semi joias perfeitas para presentear minha irmã. Ela amou cada peça!',
//       date: '2024-12-05',
//       verified: true
//     },
//     {
//       id: 5,
//       name: 'Karina Bastos',
//       rating: 6,
//       comment: 'Tô Amando meus Brincos!',
//       date: '2025-06-08',
//       verified: true
//     }
//   ]);

//   const [newTestimonial, setNewTestimonial] = useState({
//     name: '',
//     rating: 5,
//     comment: ''
//   });

//   const [showForm, setShowForm] = useState(false);

//   const handleSubmitTestimonial = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (newTestimonial.name.trim() && newTestimonial.comment.trim()) {
//       const testimonial: Testimonial = {
//         id: Date.now(),
//         name: newTestimonial.name,
//         rating: newTestimonial.rating,
//         comment: newTestimonial.comment,
//         date: new Date().toISOString().split('T')[0],
//         verified: false
//       };

//       setTestimonials(prev => [testimonial, ...prev]);
//       setNewTestimonial({ name: '', rating: 5, comment: '' });
//       setShowForm(false);

//       // Show success message
//       alert('Obrigado pelo seu depoimento! Ele será analisado e publicado em breve.');
//     }
//   };

//   return (
//     <section id="testimonials" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             O Que Nossos Clientes Dizem
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
//             A satisfação dos nossos clientes é nossa maior conquista
//           </p>
          
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-400 hover:to-pink-400 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
//           >
//             <Send className="mr-2 h-5 w-5" />
//             Deixar Depoimento
//           </button>
//         </div>

//         {/* New Testimonial Form */}
//         {showForm && (
//           <div className="max-w-2xl mx-auto mb-12 bg-gray-50 rounded-2xl p-8 shadow-lg">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//               Compartilhe sua Experiência
//             </h3>
            
//             <form onSubmit={handleSubmitTestimonial} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Seu Nome
//                 </label>
//                 <input
//                   type="text"
//                   value={newTestimonial.name}
//                   onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300"
//                   placeholder="Digite seu nome"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Avaliação
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   {[1, 2, 3, 4, 5].map(star => (
//                     <button
//                       key={star}
//                       type="button"
//                       onClick={() => setNewTestimonial(prev => ({ ...prev, rating: star }))}
//                       className="transition-transform duration-200 hover:scale-110"
//                     >
//                       <Star
//                         className={`h-8 w-8 ${
//                           star <= newTestimonial.rating
//                             ? 'text-rose-400 fill-current'
//                             : 'text-gray-300'
//                         }`}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Seu Comentário
//                 </label>
//                 <textarea
//                   value={newTestimonial.comment}
//                   onChange={(e) => setNewTestimonial(prev => ({ ...prev, comment: e.target.value }))}
//                   rows={4}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none"
//                   placeholder="Conte sobre sua experiência conosco..."
//                   required
//                 />
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-rose-400 hover:to-pink-400 transition-all duration-300 font-medium"
//                 >
//                   Enviar Depoimento
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-all duration-300 font-medium"
//                 >
//                   Cancelar
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Testimonials Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {testimonials.map(testimonial => (
//             <div
//               key={testimonial.id}
//               className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100"
//             >
//               <div className="flex items-center mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-md">
//                   <User className="h-6 w-6 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
//                     {testimonial.verified && (
//                       <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
//                         Verificado
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center mt-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className={`h-4 w-4 ${
//                           i < testimonial.rating 
//                             ? 'text-rose-400 fill-current' 
//                             : 'text-gray-300'
//                         }`}
//                       />
//                     ))}
//                     <span className="text-sm text-gray-500 ml-2">
//                       {new Date(testimonial.date).toLocaleDateString('pt-BR')}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative">
//                 <Quote className="absolute top-0 left-0 h-8 w-8 text-rose-400 opacity-20 -translate-y-2" />
//                 <p className="text-gray-700 leading-relaxed italic pl-6">
//                   "{testimonial.comment}"
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {testimonials.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">Seja o primeiro a deixar um depoimento!</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;