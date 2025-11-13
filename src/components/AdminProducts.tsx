import { useEffect, useState } from "react";

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
}

interface Comentario {
  id: number;
  nome: string;
  avaliacao: number;
  comentario: string;
  verificado: boolean;
}

export default function AdminProducts() {
  const [modo, setModo] = useState<"produtos" | "comentarios">("produtos");
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "aneis",
    id: null as number | null,
    imagem: null as string | null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const token = localStorage.getItem("adminToken");

  // ===== PRODUTOS =====
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://backendmelinda.onrender.com/produtos");
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modo === "produtos") fetchProducts();
    else fetchComentarios();
  }, [modo]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = form.id ? "PUT" : "POST";
      const url = form.id
        ? `https://backendmelinda.onrender.com/produtos/${form.id}`
        : "https://backendmelinda.onrender.com/produtos";

      const formData = new FormData();
      formData.append("nome", form.nome);
      formData.append("descricao", form.descricao);
      formData.append("preco", form.preco);
      formData.append("categoria", form.categoria);

      if (file) formData.append("imagem", file);

      const res = await fetch(url, {
        method,
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMensagem(form.id ? "Produto atualizado!" : "Produto cadastrado!");
        setForm({
          nome: "",
          descricao: "",
          preco: "",
          categoria: "aneis",
          id: null,
          imagem: null,
        });
        setFile(null);
        setPreview(null);
        fetchProducts();
      } else setMensagem("Erro ao salvar produto");
    } catch (err) {
      console.error(err);
      setMensagem("Erro na comunicação com servidor");
    }
  };

  const handleEdit = (p: Product) => {
    setForm({
      nome: p.nome,
      descricao: p.descricao,
      preco: p.preco.toString(),
      categoria: p.categoria,
      id: p.id,
      imagem: null,
    });
    setPreview(p.imagem);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    try {
      const res = await fetch(`https://backendmelinda.onrender.com/produtos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMensagem("Produto excluído!");
        fetchProducts();
      } else setMensagem("Erro ao excluir produto");
    } catch (err) {
      console.error(err);
      setMensagem("Erro na comunicação com servidor");
    }
  };

  // ===== COMENTÁRIOS =====
  const fetchComentarios = async () => {
  try {
    const res = await fetch("https://backendmelinda.onrender.com/comentarios/pendentes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    // 🔥 Garante que sempre vira array
    setComentarios(Array.isArray(data) ? data : data.data || []);
  } catch (err) {
    console.error(err);
    setComentarios([]);
  } finally {
    setLoading(false);
  }
};


  const handleAprovar = async (id: number) => {
    const res = await fetch(`https://backendmelinda.onrender.com/comentarios/${id}/aprovar`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setMensagem("Comentário aprovado!");
      fetchComentarios();
    }
  };

  const handleExcluirComentario = async (id: number) => {
    const res = await fetch(`https://backendmelinda.onrender.com/comentarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setMensagem("Comentário excluído!");
      fetchComentarios();
    }
  };

  // ===== RENDER =====
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          {modo === "produtos" ? "Administração de Produtos" : "Verificação de Comentários"}
        </h2>
        <button
          onClick={() => setModo(modo === "produtos" ? "comentarios" : "produtos")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {modo === "produtos" ? "Verificar Comentários" : "Voltar para Produtos"}
        </button>
      </div>

      {mensagem && <p className="mb-4 text-green-600 font-semibold">{mensagem}</p>}

      {modo === "comentarios" ? (
        <>
          {loading ? (
            <p>Carregando comentários...</p>
          ) : comentarios.length === 0 ? (
            <p>Nenhum comentário pendente.</p>
          ) : (
            <div className="space-y-4">
              {comentarios.map((c) => (
                <div key={c.id} className="border p-4 rounded shadow">
                  <h4 className="font-bold">{c.nome}</h4>
                  <p className="text-gray-600">{c.comentario}</p>
                  <p className="text-yellow-500">⭐ {c.avaliacao}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAprovar(c.id)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() => handleExcluirComentario(c.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {/* === FORM PRODUTO === */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
            <input
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <input
              placeholder="Descrição"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <input
              placeholder="Preço"
              type="number"
              step="0.01"
              value={form.preco}
              onChange={(e) => setForm({ ...form, preco: e.target.value })}
              required
              className="border p-2 rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded"
            />
            {preview && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Prévia da imagem:</p>
                <img src={preview} alt="Prévia" className="w-40 h-40 object-cover rounded border" />
              </div>
            )}
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="aneis">Anéis</option>
              <option value="colares">Colares</option>
              <option value="brincos">Brincos</option>
              <option value="pulseiras">Pulseiras</option>
              <option value="conjunto">Conjunto</option>
            </select>
            <button type="submit" className="bg-rose-500 text-white py-2 rounded hover:bg-rose-600">
              {form.id ? "Atualizar" : "Cadastrar"}
            </button>
          </form>

          <h3 className="text-xl font-bold mb-3">Produtos cadastrados</h3>
          {loading ? (
            <p>Carregando produtos...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {produtos.map((p) => (
                <div key={p.id} className="p-4 border rounded shadow flex flex-col">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h4 className="font-bold">{p.nome}</h4>
                  <p className="text-gray-600">{p.descricao}</p>
                  <span className="font-semibold text-pink-600">R$ {p.preco}</span>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}











