import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Bot, 
  Send, 
  ChevronRight, 
  GraduationCap, 
  Search, 
  User, 
  Clock,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

const LUSTOSA_THEME = {
  canvas: 'bg-slate-50',
  surface: 'bg-white',
  primary: 'text-indigo-600',
  primaryBg: 'bg-indigo-600',
  primaryHover: 'hover:bg-indigo-700',
  textMain: 'text-slate-900',
  textMuted: 'text-slate-500',
  border: 'border-slate-200',
  accent: 'bg-amber-400'
};

const CONTENT_DATA = {
  years: [
    { 
      id: 1, 
      title: '1º Ano Ensino Médio', 
      topics: [
        { id: 'm1_1', title: 'Conjuntos e Funções', desc: 'Domínio, imagem e tipos de funções.' },
        { id: 'm1_2', title: 'Exponenciais e Logaritmos', desc: 'Propriedades e equações logarítmicas.' },
        { id: 'm1_3', title: 'Trigonometria Básica', desc: 'Seno, cosseno e tangente no triângulo.' },
      ] 
    },
    { 
      id: 2, 
      title: '2º Ano Ensino Médio', 
      topics: [
        { id: 'm2_1', title: 'Análise Combinatória', desc: 'Arranjos, permutações e combinações.' },
        { id: 'm2_2', title: 'Probabilidade', desc: 'Eventos independentes e condicionais.' },
        { id: 'm2_3', title: 'Geometria Espacial', desc: 'Prismas, pirâmides e esferas.' },
      ] 
    },
    { 
      id: 3, 
      title: '3º Ano Ensino Médio', 
      topics: [
        { id: 'm3_1', title: 'Geometria Analítica', desc: 'Pontos, retas e circunferências.' },
        { id: 'm3_2', title: 'Números Complexos', desc: 'Forma algébrica e trigonométrica.' },
        { id: 'm3_3', title: 'Polinômios e Equações', desc: 'Raízes e Teorema Fundamental da Álgebra.' },
      ] 
    },
  ]
};

export default function LustosaEstudosM() {
  const [activeTab, setActiveTab] = useState('learn'); // 'learn', 'community', 'tutor'
  const [selectedYear, setSelectedYear] = useState(1);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Lucas', text: 'Alguém sabe resolver a questão 4 de Logaritmos?', time: '10:30', type: 'user' },
    { id: 2, user: 'Ana', text: 'Tenta usar a propriedade da soma, Lucas! Ajuda muito.', time: '10:32', type: 'user' },
  ]);
  const [tutorMessages, setTutorMessages] = useState([
    { id: 1, user: 'Tutor Lustosa', text: 'Olá! Sou seu tutor virtual de matemática. Qual tópico do Ensino Médio vamos dominar hoje?', time: 'Agora', type: 'bot' },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [tutorInput, setTutorInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const chatEndRef = useRef(null);
  const tutorEndRef = useRef(null);

  const scrollToBottom = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom(chatEndRef);
  }, [chatMessages]);

  useEffect(() => {
    scrollToBottom(tutorEndRef);
  }, [tutorMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages([...chatMessages, { 
      id: Date.now(), 
      user: 'Você', 
      text: inputMsg, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      type: 'user' 
    }]);
    setInputMsg('');
  };

  const handleTutorAsk = (e) => {
    e.preventDefault();
    if (!tutorInput.trim()) return;
    
    const userMsg = { 
      id: Date.now(), 
      user: 'Você', 
      text: tutorInput, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      type: 'user' 
    };
    
    setTutorMessages(prev => [...prev, userMsg]);
    setTutorInput('');

    // Simulação de resposta do Tutor
    setTimeout(() => {
      setTutorMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        user: 'Tutor Lustosa', 
        text: `Analisando sua dúvida sobre "${userMsg.text}"... Para resolver isso, recomendo focar na base teórica do conteúdo. Gostaria que eu explicasse o passo a passo ou prefere um exemplo prático?`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        type: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${LUSTOSA_THEME.canvas} flex flex-col font-sans`}>
      {/* Header */}
      <header className={`${LUSTOSA_THEME.surface} border-b ${LUSTOSA_THEME.border} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`${LUSTOSA_THEME.primaryBg} p-2 rounded-lg text-white`}>
              <GraduationCap size={24} />
            </div>
            <h1 className={`text-xl font-bold tracking-tight ${LUSTOSA_THEME.textMain}`}>
              LUSTOSA <span className={LUSTOSA_THEME.primary}>ESTUDOS M</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavButton active={activeTab === 'learn'} onClick={() => setActiveTab('learn')} icon={<BookOpen size={18}/>} label="Aprender" />
            <NavButton active={activeTab === 'community'} onClick={() => setActiveTab('community')} icon={<MessageSquare size={18}/>} label="Comunidade" />
            <NavButton active={activeTab === 'tutor'} onClick={() => setActiveTab('tutor')} icon={<Bot size={18}/>} label="Tutor Virtual" />
          </nav>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className={`${LUSTOSA_THEME.surface} md:hidden border-t ${LUSTOSA_THEME.border} p-4 flex flex-col gap-2`}>
            <NavButton active={activeTab === 'learn'} onClick={() => {setActiveTab('learn'); setIsMenuOpen(false)}} icon={<BookOpen size={18}/>} label="Aprender" />
            <NavButton active={activeTab === 'community'} onClick={() => {setActiveTab('community'); setIsMenuOpen(false)}} icon={<MessageSquare size={18}/>} label="Comunidade" />
            <NavButton active={activeTab === 'tutor'} onClick={() => {setActiveTab('tutor'); setIsMenuOpen(false)}} icon={<Bot size={18}/>} label="Tutor Virtual" />
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6">
        
        {/* VIEW: LEARN */}
        {activeTab === 'learn' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className={`text-2xl font-bold ${LUSTOSA_THEME.textMain}`}>Trilhas de Aprendizado</h2>
                <p className={LUSTOSA_THEME.textMuted}>Selecione sua série para acessar os conteúdos de matemática.</p>
              </div>
              <div className="flex gap-2 p-1 bg-slate-200 rounded-xl w-fit">
                {[1, 2, 3].map(year => (
                  <button 
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedYear === year ? `${LUSTOSA_THEME.primaryBg} text-white shadow-sm` : 'text-slate-600 hover:bg-slate-300'}`}
                  >
                    {year}º Ano
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CONTENT_DATA.years.find(y => y.id === selectedYear).topics.map(topic => (
                <div key={topic.id} className={`${LUSTOSA_THEME.surface} p-5 rounded-2xl border ${LUSTOSA_THEME.border} hover:border-indigo-300 transition-colors group cursor-pointer`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className={`p-2 rounded-lg ${LUSTOSA_THEME.canvas} ${LUSTOSA_THEME.primary} group-hover:bg-indigo-50 transition-colors`}>
                      <BookOpen size={20} />
                    </div>
                    <CheckCircle2 size={18} className="text-slate-300" />
                  </div>
                  <h3 className={`font-semibold mb-1 ${LUSTOSA_THEME.textMain}`}>{topic.title}</h3>
                  <p className={`text-sm ${LUSTOSA_THEME.textMuted} mb-4`}>{topic.desc}</p>
                  <button className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${LUSTOSA_THEME.primaryBg} text-white ${LUSTOSA_THEME.primaryHover}`}>
                    Acessar Material <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: COMMUNITY */}
        {activeTab === 'community' && (
          <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Chat Geral de Alunos</h3>
                  <p className="text-xs text-slate-500">Compartilhe dúvidas e ajude seus colegas</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> 12 alunos online
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.user === 'Você' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${msg.user === 'Você' ? 'order-1' : 'order-2'}`}>
                    <div className={`flex items-center gap-2 mb-1 ${msg.user === 'Você' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs font-semibold text-slate-600">{msg.user}</span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${msg.user === 'Você' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Digite sua mensagem para a turma..." 
                className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button type="submit" className={`${LUSTOSA_THEME.primaryBg} text-white p-2 rounded-full hover:scale-105 transition-transform`}>
                <Send size={20} />
              </button>
            </form>
          </div>
        )}

        {/* VIEW: TUTOR */}
        {activeTab === 'tutor' && (
          <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-indigo-600 text-white">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold">Tutor Virtual Lustosa</h3>
                <p className="text-xs text-indigo-100">IA Especialista em Matemática Ensino Médio</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {tutorMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-slate-300' : 'bg-indigo-600 text-white'}`}>
                      {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.type === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'}`}>
                      <div className="flex justify-between gap-4 mb-1">
                        <span className="text-[10px] font-bold uppercase opacity-70">{msg.user}</span>
                        <span className="text-[10px] opacity-50">{msg.time}</span>
                      </div>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={tutorEndRef} />
            </div>

            <form onSubmit={handleTutorAsk} className="p-4 border-t border-slate-100 flex gap-2 bg-white">
              <input 
                type="text" 
                value={tutorInput}
                onChange={(e) => setTutorInput(e.target.value)}
                placeholder="Tire sua dúvida matemática aqui..." 
                className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button type="submit" className={`${LUSTOSA_THEME.primaryBg} text-white p-2 rounded-full hover:scale-105 transition-transform`}>
                <Send size={20} />
              </button>
            </form>
          </div>
        )}

      </main>

      <footer className={`py-6 border-t ${LUSTOSA_THEME.border} ${LUSTOSA_THEME.surface} text-center`}>
        <p className={`text-xs ${LUSTOSA_THEME.textMuted}`}>
          © 2026 LUSTOSA ESTUDOS M — Transformando a matemática em aprendizado real.
        </p>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
        active 
        ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100' 
        : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}