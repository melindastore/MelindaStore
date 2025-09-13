import { useState } from "react";

export default function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🚀 Corrigi a rota: é /login, não /admin/login
      const res = await fetch("https://backendmelinda.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      if (res.ok) {
        const data = await res.json();

        // 🔑 Salva o token JWT no navegador
        localStorage.setItem("adminToken", data.token);

        // chama o callback pra atualizar o estado do app
        onLogin(data.token);
      } else {
        setErro("Usuário ou senha incorretos");
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 border rounded bg-white shadow"
    >
      <h2 className="text-xl font-bold mb-4">Login Administrador</h2>

      {erro && <p className="text-red-500 mb-3">{erro}</p>}

      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <button className="bg-rose-500 text-white py-2 rounded w-full hover:bg-rose-600 transition">
        Entrar
      </button>
    </form>
  );
}
