import React, { useState } from 'react';
import {
  Search,
  TrendingDown,
  Bell,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Tag,
  Filter
} from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);

    try {
      // API pública do Mercado Livre (não precisa de chave para buscas simples)
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchQuery}`);
      const data = await response.json();

      // Pegamos os 6 primeiros resultados
      const formattedProducts = data.results.slice(0, 6).map(item => ({
        id: item.id,
        name: item.title,
        price: item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        oldPrice: (item.price * 1.15).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), // Simulação de preço antigo
        change: -15,
        status: "low",
        image: item.thumbnail.replace("-I.jpg", "-O.jpg") // Melhora a qualidade da imagem
      }));

      console.log("formattedProducts: ", formattedProducts)

      setResults(formattedProducts);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const watchedProducts = [
    { id: 1, name: "iPhone 15 Pro", price: "R$ 6.299", change: -12, status: "low" },
    { id: 2, name: "Monitor Gamer 144hz", price: "R$ 1.150", change: 5, status: "high" },
    { id: 3, name: "Kindle Paperwhite", price: "R$ 649", change: -8, status: "low" },
  ];

  return (


    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Barra de Navegação */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-2xl text-indigo-600 tracking-tight">
          <TrendingDown size={32} strokeWidth={2.5} />
          <span>SmartPrice</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition">Dashboard</a>
          <a href="#" className="hover:text-indigo-600 transition">Histórico</a>
          <a href="#" className="hover:text-indigo-600 transition">Configurações</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition">
            <Bell size={20} />
          </button>
          <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs">
            AR
          </div>
        </div>
      </nav>

      {/* Hero / Busca */}
      <header className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Economize monitorando <span className="text-indigo-600">preços reais</span>
          </h1>
          <p className="text-slate-500 mb-8 text-lg">
            Rastreamos variações de preços a cada hora para você nunca mais perder uma promoção.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cole o link do produto ou digite o que procura..."
              className="w-full pl-12 pr-32 py-4 bg-slate-100 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition">
              Rastrear
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart3 className="text-indigo-600" size={24} />
            Seus Produtos Monitorados
          </h2>
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50">
            <Filter size={16} /> Filtrar
          </button>
        </div>

      </main>
    </div>
  );
}

export default App;