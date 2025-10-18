//teste
import { useEffect, useState } from "react";

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string;
}

export default function AdminProducts() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "aneis",
    id: null as number | null,
    imagem: null as string | null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // ✅ novo estado para prévia
  const [mensagem, setMensagem] = useState("");

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
    fetchProducts();
  }, []);

  // ✅ quando escolher imagem, gera a URL de prévia
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
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

      if (file) {
        formData.append("imagem", file);
      }

      const token = localStorage.getItem("adminToken");

      const res = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        setPreview(null); // ✅ limpa prévia após envio
        fetchProducts();
      } else {
        const errData = await res.json();
        console.error("Erro ao salvar:", errData);
        setMensagem("Erro ao salvar produto");
      }
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
    setFile(null);
    setPreview(p.imagem); // ✅ mostra imagem atual como prévia ao editar
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`https://backendmelinda.onrender.com/produtos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMensagem("Produto excluído!");
        fetchProducts();
        alert("Produto excluído com sucesso!");
      } else {
        setMensagem("Erro ao excluir produto");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro na comunicação com servidor");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Administração de Produtos</h2>
      {mensagem && <p className="mb-4 text-green-600 font-semibold">{mensagem}</p>}

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

        {/* ✅ Preview da imagem */}
        {preview && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Prévia da imagem:</p>
            <img
              src={preview}
              alt="Prévia do produto"
              className="w-40 h-40 object-cover rounded border"
            />
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

        <button
          type="submit"
          className="bg-rose-500 text-white py-2 rounded hover:bg-rose-600"
        >
          {form.id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <h3 className="text-xl font-bold mb-3">Produtos cadastrados</h3>
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {produtos.map((p) => (
            <div
              key={p.id}
              className="p-4 border rounded shadow flex flex-col"
            >
              <img
                src={p.imagem}
                alt={p.nome}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h4 className="font-bold">{p.nome}</h4>
              <p className="text-gray-600">{p.descricao}</p>
              <span className="font-semibold text-pink-600">
                R$ {p.preco}
              </span>
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
    </div>
  );
}












