import { useState, useEffect, useRef } from 'react'
import logo from './assets/LogoLovefy.png' // Ou logo.svg

// --- SEUS COMPONENTES DE ÍCONES (SVG) ---
const Globe = ({size=14}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);
const Lock = ({size=14}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const PlayCircle = ({size=32}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" fill="white"></circle><polygon points="10 8 16 12 10 16 10 8" fill="black"></polygon></svg>);
const PauseCircle = ({size=32}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" fill="white"></circle><line x1="10" y1="15" x2="10" y2="9" stroke="black" strokeWidth="2"></line><line x1="14" y1="15" x2="14" y2="9" stroke="black" strokeWidth="2"></line></svg>);
const SkipBack = ({size=22}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>);
const SkipForward = ({size=22}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>);
const Search = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const Home = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>);
const Library = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 6l4 14M12 6v14M8 8v12M4 4v16"/></svg>);
const MenuIcon = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const Bell = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>);
const User = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const Plus = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const MusicNote = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>);
const VolumeIcons = ({volume, size=20}) => {
    if (volume === 0) return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>;
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
};

const API_URL = 'http://localhost:8082';
const formatarTempo = (s) => isNaN(s) ? '0:00' : `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`;

function App() {
  const [termoBusca, setTermoBusca] = useState('');
  const [musicas, setMusicas] = useState([]);
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [estaTocando, setEstaTocando] = useState(false);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [duracaoTotal, setDuracaoTotal] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const [hoverProgresso, setHoverProgresso] = useState(false);
  const [hoverVolume, setHoverVolume] = useState(false);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [pesquisaFoco, setPesquisaFoco] = useState(false); // Controla se a caixa flutuante aparece
  const [viewAtiva, setViewAtiva] = useState(null); // Guarda os dados do Artista ou Álbum clicado
const [form, setForm] = useState({
  titulo: '',
  artista: '',
  album: '',
  isAlbum: false,
  arquivoMp3: null,
  arquivoImagem: null,
  previewImagem: null
});

// --- CARREGAR MÚSICAS DO BANCO ---
  const carregarMusicas = async () => {
    try {
      const res = await fetch(`${API_URL}/musicas`);
      if (res.ok) {
        const dados = await res.json();
        setMusicas(dados);
      }
    } catch (err) {
      console.error("Erro ao carregar músicas:", err);
    }
  };

  // Esse hook faz com que as músicas sejam buscadas ASSIM QUE O SITE ABRIR
  useEffect(() => {
    carregarMusicas();
  }, []);
// --- ESTADOS DAS PLAYLISTS ---
  const [playlists, setPlaylists] = useState([]);
  const [playlistAtiva, setPlaylistAtiva] = useState(null); 
  const [mostrarModalPlaylist, setMostrarModalPlaylist] = useState(false);
  const [novaPlaylist, setNovaPlaylist] = useState({ nome: '', isGlobal: false });

const criarNovaPlaylistVisual = (e) => {
    e.preventDefault();
    if (novaPlaylist.nome.trim() !== '') {
      const nova = {
        id: Date.now(), // Temporário até ligar com o Java
        nome: novaPlaylist.nome,
        isGlobal: novaPlaylist.isGlobal,
        musicasIds: []
      };
      
      const novasPlaylists = [...playlists, nova];
      setPlaylists(novasPlaylists); // Atualiza a tela
      
      // SALVA NA GAVETINHA DO USUÁRIO
      if (usuario) {
        localStorage.setItem(`playlists_${usuario.email}`, JSON.stringify(novasPlaylists));
      }

      setMostrarModalPlaylist(false);
      setNovaPlaylist({ nome: '', isGlobal: false });
      setPlaylistAtiva(nova); // Abre a playlist automaticamente
    }
  };
  
  const pegarCapaPlaylist = (musicasIds) => {
    if (!musicasIds || musicasIds.length === 0) return null;
    const primeiraMusica = musicas.find(m => m.id === musicasIds[0]);
    return primeiraMusica ? `${API_URL}/uploads/${primeiraMusica.caminhoImagem}` : null;
  };

const [usuario, setUsuario] = useState(null); // Você já tem essa linha!

  // --- NOVO: Carrega as playlists salvas sempre que a conta mudar ---
  useEffect(() => {
    if (usuario && usuario.email) {
      const gavetaDoUsuario = localStorage.getItem(`playlists_${usuario.email}`);
      if (gavetaDoUsuario) {
        setPlaylists(JSON.parse(gavetaDoUsuario));
      } else {
        setPlaylists([]); // Conta nova, sem playlists
      }
    } else {
      setPlaylists([]); // Deslogou, esconde tudo
    }
    setPlaylistAtiva(null); // Volta pra Home
  }, [usuario]);
const [mostrarAuth, setMostrarAuth] = useState(false); // Mudamos o nome para Auth (Abrange ambos)
const [estaCadastrando, setEstaCadastrando] = useState(false); // Alterna entre Login e Cadastro
const [dadosAuth, setDadosAuth] = useState({ nome: '', email: '', senha: '' });

// Músicas que serão mostradas na lista principal (filtradas ou todas)
const musicasExibidas = playlistAtiva 
    ? musicas.filter(m => playlistAtiva.musicasIds?.includes(m.id))
    : viewAtiva
      ? (viewAtiva.type === 'artist' 
          ? musicas.filter(m => m.artista === viewAtiva.name) 
          : musicas.filter(m => m.album === viewAtiva.name))
      : (termoBusca !== '' && !pesquisaFoco)
        ? musicas.filter(m => {
            const termo = termoBusca.toLowerCase();
            return (m.titulo.toLowerCase().includes(termo) || m.artista.toLowerCase().includes(termo) || (m.album && m.album.toLowerCase().includes(termo)));
          })
        : musicas;

  const audioRef = useRef(null);

  // Faz o modal de login abrir sozinho ao carregar a página
useEffect(() => {
  if (!usuario) {
    setMostrarAuth(true);
  }
}, []); // Array vazio significa: "execute apenas uma vez quando o site abrir"

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);
const realizarCadastro = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_URL}/usuarios/cadastrar`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAuth)
    });

    if (res.ok) {
      const novoUsuario = await res.json();
      setUsuario({ nome: novoUsuario.nome, role: 'USER' });
      setMostrarAuth(false);
      alert(`Bem-vindo, ${novoUsuario.nome}!`);
    } else {
      const errorData = await res.json().catch(() => ({}));
      alert(`Erro ${res.status}: ${errorData.message || 'Erro no servidor'}`);
    }
  } catch (err) {
    alert("Servidor Offline! Verifique se o Java está rodando na porta 8082.");
    console.error(err);
  }
};

const realizarLogin = async (e) => {
  e.preventDefault();
  
  try {
    const res = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: dadosAuth.email, senha: dadosAuth.senha })
    });

    if (res.ok) {
      const usuarioLogado = await res.json();
      
      // REGRA DE OURO: Se for o email do admin, força o cargo ADMIN!
      let cargo = 'USER';
      if (usuarioLogado.email === 'admin@lovefy.com' || usuarioLogado.tipo === 'admin') {
        cargo = 'ADMIN';
      }

      // Salvamos o nome, email e cargo no estado do React
      setUsuario({ nome: usuarioLogado.nome, email: usuarioLogado.email, role: cargo });
      setMostrarAuth(false);
    } else {
      alert("E-mail ou senha incorretos!");
    }
  } catch (err) {
    console.error("Erro ao logar:", err);
    alert("Erro ao conectar com o servidor!");
  }
};

  const aoDarPlay = (m) => {
    if (musicaAtual?.id === m.id) {
      estaTocando ? audioRef.current.pause() : audioRef.current.play();
      setEstaTocando(!estaTocando);
    } else {
      setMusicaAtual(m);
      audioRef.current.src = `${API_URL}/uploads/${m.caminhoMp3}`;
      audioRef.current.play();
      setEstaTocando(true);
    }
  };

  const skip = (dir) => {
    const idx = musicas.findIndex(m => m.id === musicaAtual?.id);
    const next = musicas[idx + dir] || (dir > 0 ? musicas[0] : musicas[musicas.length - 1]);
    if (next) aoDarPlay(next);
  };

 const salvarMusica = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('artista', form.artista);
    formData.append('album', form.album);
    formData.append('mp3', form.arquivoMp3); // Tem que bater com o nome esperado no Java
    formData.append('imagem', form.arquivoImagem); // Tem que bater com o nome esperado no Java

    try {
      const res = await fetch(`${API_URL}/musicas`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        alert("Música salva com sucesso!");
        setMostrarAdmin(false); // Fecha a tela de admin
        carregarMusicas(); // <--- ATUALIZA A LISTA NA TELA NA MESMA HORA
      } else {
        alert("Erro ao salvar música. Verifique o servidor.");
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  };

  const progressPercent = (tempoAtual / duracaoTotal) * 100 || 0;
  const volumePercent = volume * 100;

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans select-none">
    {/* --- AREA: HEADER --- */}
      <header className="h-16 bg-black/95 backdrop-blur-md z-50 flex items-center justify-between px-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {/* NOVO LOGO EM TEXTO */}
            <h1 className="text-3xl font-black text-[#1db954] tracking-tighter cursor-pointer hover:scale-105 transition-transform">
              Lovefy
            </h1>
          </div>
        </div>
        
        {/* BARRA DE PESQUISA COM A CAIXA FLUTUANTE */}
        <div className="flex-1 max-w-md mx-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 z-10">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Música, Artista ou Álbum..." 
            value={termoBusca}
            onFocus={() => setPesquisaFoco(true)} // Abre o menu ao clicar
            onBlur={() => setTimeout(() => setPesquisaFoco(false), 200)} // Fecha o menu ao clicar fora (com atraso para dar tempo de clicar no item)
            onChange={(e) => {
              setTermoBusca(e.target.value);
              // Quando o usuário digitar algo, sai das playlists e vai para os resultados!
              if (e.target.value.trim() !== '') {
                setPlaylistAtiva(null); 
                setMostrarAdmin(false);
              }
            }}
            className="w-full h-10 bg-[#2a2a2a] text-white rounded-full pl-10 pr-4 outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder-gray-500 font-medium text-sm relative z-20" 
          />

          {/* CAIXA FLUTUANTE DE RESULTADOS */}
          {pesquisaFoco && termoBusca.trim() !== '' && (
            <div className="absolute top-12 left-0 w-full bg-[#282828] border border-white/5 rounded-xl shadow-2xl z-50 max-h-[400px] overflow-y-auto p-2 animate-fadeIn flex flex-col gap-1">
              
              {/* RESULTADOS: MÚSICAS */}
              {musicas.filter(m => m.titulo.toLowerCase().includes(termoBusca.toLowerCase())).slice(0, 3).map(m => (
                <div key={`musica-${m.id}`} onClick={() => { aoDarPlay(m); setPesquisaFoco(false); setTermoBusca(''); }} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors group">
                  <img src={`${API_URL}/uploads/${m.caminhoImagem}`} className="w-10 h-10 rounded object-cover shadow-md" alt="Capa" />
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-sm font-bold text-white truncate group-hover:text-[#1db954]">{m.titulo}</span>
                    <span className="text-xs text-gray-400 truncate">Música • {m.artista}</span>
                  </div>
                </div>
              ))}

              {/* RESULTADOS: ARTISTAS */}
              {[...new Set(musicas.filter(m => m.artista.toLowerCase().includes(termoBusca.toLowerCase())).map(m => m.artista))].slice(0, 2).map(artista => (
                <div key={`artista-${artista}`} onClick={() => { setViewAtiva({ type: 'artist', name: artista }); setPesquisaFoco(false); setPlaylistAtiva(null); setMostrarAdmin(false); setTermoBusca(''); }} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0 shadow-md">
                    <User />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-sm font-bold text-white truncate group-hover:text-[#1db954]">{artista}</span>
                    <span className="text-xs text-gray-400">Artista</span>
                  </div>
                </div>
              ))}

              {/* RESULTADOS: ÁLBUNS */}
              {[...new Map(musicas.filter(m => m.album && m.album.toLowerCase().includes(termoBusca.toLowerCase())).map(m => [m.album, m])).values()].slice(0, 2).map(m => (
                <div key={`album-${m.album}`} onClick={() => { setViewAtiva({ type: 'album', name: m.album, capa: m.caminhoImagem, artista: m.artista }); setPesquisaFoco(false); setPlaylistAtiva(null); setMostrarAdmin(false); setTermoBusca(''); }} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors group">
                  <img src={`${API_URL}/uploads/${m.caminhoImagem}`} className="w-10 h-10 rounded object-cover shadow-md" alt="Capa Álbum" />
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-sm font-bold text-white truncate group-hover:text-[#1db954]">{m.album}</span>
                    <span className="text-xs text-gray-400 truncate">Álbum • {m.artista}</span>
                  </div>
                </div>
              ))}

              {/* SE NÃO ACHAR NADA */}
              {musicas.filter(m => m.titulo.toLowerCase().includes(termoBusca.toLowerCase()) || m.artista.toLowerCase().includes(termoBusca.toLowerCase()) || (m.album && m.album.toLowerCase().includes(termoBusca.toLowerCase()))).length === 0 && (
                <div className="p-4 text-center text-sm text-gray-400">Nenhum resultado encontrado.</div>
              )}
            </div>
          )}
        </div>

        {/* Direita: Notificações e Perfil/Login */}
        <div className="flex items-center gap-6 relative">
          
          <button className="text-gray-400 hover:text-white transition-colors p-1">
            <Bell />
          </button>
          
          {usuario ? (
            /* Se estiver logado: Mostra o círculo de perfil */
            <button 
              onClick={() => setPerfilAberto(!perfilAberto)} 
              className="bg-white/10 rounded-full p-1 flex items-center transition border border-transparent"
            >
              <div className="bg-gradient-to-tr from-[#1db954] to-blue-500 rounded-full p-1.5 hover:scale-110 transition-transform">
                <User />
              </div>
            </button>
          ) : (
            /* Se NÃO estiver logado: Mostra o botão "Entrar" */
            <button 
              onClick={() => setMostrarAuth(true)}
              className="bg-white text-black text-sm font-bold py-2 px-6 rounded-full hover:scale-105 transition-all"
            >
              Entrar
            </button>
          )}
          
          {perfilAberto && usuario && (
            <div className="absolute top-12 right-0 bg-[#282828] shadow-2xl rounded-md p-1 w-48 animate-fadeIn z-50 border border-white/5">
              <div className="p-3 border-b border-white/5">
                <p className="text-sm font-bold">{usuario.nome}</p>
                
                {/* Mostra se é ADMIN ou Usuário Comum */}
                {usuario.role === 'ADMIN' ? (
                  <p className="text-[10px] text-red-500 font-black uppercase tracking-widest mt-1">👑 Administrador</p>
                ) : (
                  <p className="text-[10px] text-[#1db954] mt-1">Conta Verificada</p>
                )}
                
              </div>
              <button 
                onClick={() => { 
                  setUsuario(null); 
                  setPerfilAberto(false); 
                  setEstaCadastrando(false);
                  setMostrarAuth(true);
                }} 
                className="w-full text-left p-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden px-[8px] pb-[8px] gap-[8px]">
{/* --- AREA: SIDEBAR --- */}
        {/* --- AREA: SIDEBAR --- */}
        <aside className={`${sidebarAberta ? 'w-64' : 'w-20'} shrink-0 bg-[#121212] flex flex-col pt-6 transition-all duration-300 ease-in-out rounded-lg overflow-hidden`}>
          
          {/* Botão Minimizar */}
          <div onClick={() => setSidebarAberta(!sidebarAberta)} className="flex items-center h-12 w-full group cursor-pointer mb-2">
            <div className="w-20 flex justify-center shrink-0 text-gray-400 group-hover:text-white transition-colors"><MenuIcon /></div>
            {sidebarAberta && <span className="font-bold text-gray-400 group-hover:text-white transition-all duration-100 truncate pr-4">Minimizar</span>}
          </div>

          {/* NAVEGAÇÃO PADRÃO */}
          <nav className="flex flex-col gap-1">
            <div onClick={() => setPlaylistAtiva(null)} className="flex items-center h-12 w-full group cursor-pointer">
              <div className="w-20 flex justify-center shrink-0 text-gray-400 group-hover:text-white"><Home size={24} /></div>
              {sidebarAberta && <span className={`font-bold transition-all truncate pr-4 ${!playlistAtiva ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>Home</span>}
            </div>
          </nav>

          {/* AREA: PLAYLISTS */}
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2 flex-1 overflow-y-auto">
            
            {/* Cabeçalho da Biblioteca + Botão Criar (Agora abre o Modal) */}
            <div className={`flex items-center w-full ${sidebarAberta ? 'px-6 justify-between' : 'justify-center'} mb-2`}>
              {sidebarAberta && <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors cursor-default">Sua Biblioteca</span>}
              <button 
                onClick={() => setMostrarModalPlaylist(true)} 
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full" 
                title="Criar Playlist"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Lista de Playlists */}
            <div className="flex flex-col gap-1 px-2 pb-4">
              {playlists.map(playlist => {
                const capa = pegarCapaPlaylist(playlist.musicasIds);
                const isAtiva = playlistAtiva?.id === playlist.id;

                return (
                  <div 
                    key={playlist.id}
                    onClick={() => setPlaylistAtiva(playlist)}
                    className={`flex items-center h-16 w-full group cursor-pointer hover:bg-white/10 transition-colors rounded-md ${sidebarAberta ? 'px-3 gap-3' : 'justify-center'} ${isAtiva ? 'bg-white/10' : ''}`}
                  >
                    {/* Imagem da Playlist */}
                    <div className="shrink-0 flex items-center justify-center">
                      {capa ? (
                        <img 
                          src={capa} 
                          className={`rounded shadow-lg object-cover transition-all ${sidebarAberta ? 'w-12 h-12' : 'w-10 h-10'}`} 
                          alt="Capa"
                        />
                      ) : (
                        <div className={`bg-[#282828] rounded flex items-center justify-center shrink-0 transition-all ${sidebarAberta ? 'w-12 h-12' : 'w-10 h-10'}`}>
                          <MusicNote size={sidebarAberta ? 24 : 20} className="text-[#b3b3b3]" />
                        </div>
                      )}
                    </div>
                    
                    {/* Textos e Ícone de Privacidade da Playlist */}
                    {sidebarAberta && (
                      <div className="flex flex-col overflow-hidden w-full pr-2">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold truncate ${isAtiva ? 'text-[#1db954]' : 'text-gray-300 group-hover:text-white'}`}>
                            {playlist.nome}
                          </span>
                          {/* Ícone mostrando se é Global ou Privada */}
                          <span className="text-gray-500 shrink-0 ml-2" title={playlist.isGlobal ? 'Global' : 'Privada'}>
                            {playlist.isGlobal ? <Globe size={14} /> : <Lock size={14} />}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-500 truncate">Playlist • {playlist.musicasIds?.length || 0} músicas</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>


        {/* --- AREA: CONTEUDO PRINCIPAL --- */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1e1e1e] to-[#121212] p-8 rounded-lg relative">
          
          {/* CABEÇALHO DO MAIN */}
          <div className="flex justify-between items-start mb-8 animate-fadeIn">
            
            {/* Lado Esquerdo: Lógica Inteligente de Títulos */}
            {mostrarAdmin ? (
               <h2 className="text-3xl font-black mt-4">Cadastrar Nova Faixa</h2>
            ) : termoBusca !== '' ? (
              // --- CABEÇALHO DA TELA DE PESQUISA (ESTILO SPOTIFY) ---
              <div className="h-40 flex flex-col justify-end">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Busca</span>
                <h2 className="text-5xl font-black text-white tracking-tighter truncate">
                  Resultados para "{termoBusca}"
                </h2>
              </div>
            ) : playlistAtiva ? (
              // --- CABEÇALHO DA PLAYLIST ---
              <div className="flex items-end gap-6">
                {pegarCapaPlaylist(playlistAtiva.musicasIds) ? (
                  <img src={pegarCapaPlaylist(playlistAtiva.musicasIds)} className="w-56 h-56 shadow-2xl rounded transform hover:scale-105 transition-all duration-500 object-cover" alt="Capa" />
                ) : (
                  <div className="w-56 h-56 bg-[#282828] shadow-2xl rounded flex items-center justify-center">
                    <MusicNote size={80} className="text-[#b3b3b3]" />
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    Playlist {playlistAtiva.isGlobal ? <Globe size={14} /> : <Lock size={14}/>}
                  </span>
                  <h2 className="text-7xl font-black mt-2 mb-6 tracking-tighter leading-none">{playlistAtiva.nome}</h2>
                  <p className="text-white/70 font-bold text-sm">
                    {playlistAtiva.isGlobal ? 'Pública (Todos podem ver)' : 'Privada'} • {playlistAtiva.musicasIds?.length || 0} músicas
                  </p>
                </div>
              </div>
            ) : (
              // --- CABEÇALHO DA HOME ---
              <div className="h-40 flex flex-col justify-end">
                <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Home</h2>
              </div>
            )}

            {/* Lado Direito: Botão do Admin */}
            {usuario?.role === 'ADMIN' && (
              <button 
                onClick={() => setMostrarAdmin(!mostrarAdmin)}
                className="bg-[#1db954] text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-all shadow-xl mt-4"
              >
                {mostrarAdmin ? '← Voltar para a Home' : '+ Adicionar Música'}
              </button>
            )}
          </div>

          {/* ÁREA DE CONTEÚDO */}
          {mostrarAdmin ? (
            <div className="max-w-2xl mx-auto animate-fadeIn mt-8">
              {/* FORMULÁRIO DE ADMIN */}
              <form onSubmit={salvarMusica} className="grid grid-cols-2 gap-6 bg-black/30 p-8 rounded-xl border border-white/5">
                <div className="col-span-2 flex flex-col items-center mb-4">
                  <div className="w-40 h-40 bg-[#282828] rounded-md overflow-hidden border border-white/10 flex items-center justify-center mb-4">
                    {form.previewImagem ? (
                      <img src={form.previewImagem} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <span className="text-gray-500 text-xs text-center p-4">Sem imagem<br/>selecionada</span>
                    )}
                  </div>
                  <label className="cursor-pointer bg-white text-black text-xs font-bold py-2 px-4 rounded-full">
                    Selecionar Capa
                    <input type="file" className="hidden" accept="image/*" onChange={e => {
                      const file = e.target.files[0];
                      if(file) setForm({...form, arquivoImagem: file, previewImagem: URL.createObjectURL(file)});
                    }} />
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400">Título</label>
                  <input type="text" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} className="bg-[#3e3e3e] p-2 rounded outline-none focus:ring-1 focus:ring-[#1db954]" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400">Artista</label>
                  <input type="text" value={form.artista} onChange={e => setForm({...form, artista: e.target.value})} className="bg-[#3e3e3e] p-2 rounded outline-none focus:ring-1 focus:ring-[#1db954]" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400">Álbum (Opcional)</label>
                  <input type="text" value={form.album} onChange={e => setForm({...form, album: e.target.value})} className="bg-[#3e3e3e] p-2 rounded outline-none focus:ring-1 focus:ring-[#1db954]" />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" checked={form.isAlbum} onChange={e => setForm({...form, isAlbum: e.target.checked})} className="w-4 h-4 accent-[#1db954]" />
                  <label className="text-sm font-bold">É um álbum?</label>
                </div>
                <div className="col-span-2 flex flex-col gap-2 mt-4">
                  <label className="text-xs font-bold text-gray-400">Arquivo da Música (MP3)</label>
                  <input type="file" accept="audio/mp3" onChange={e => setForm({...form, arquivoMp3: e.target.files[0]})} className="text-sm text-gray-400" required />
                </div>
                <button type="submit" className="col-span-2 mt-6 bg-[#1db954] text-black font-bold py-3 rounded-full hover:scale-105 transition-all">
                  Salvar na Biblioteca
                </button>
              </form>
            </div>
          ) : (
            <div className="w-full mt-8">
              {musicasExibidas.length > 0 ? (
                <>
                  <div className="grid grid-cols-[16px_2fr_1fr_auto_auto] gap-4 px-4 py-2 text-gray-400 text-xs uppercase tracking-widest border-b border-white/5 mb-4">
                    <span>#</span>
                    <span>Título</span>
                    <span>Álbum</span>
                    <span>Duração</span>
                    <span></span> {/* Coluna vazia para o botão de adicionar */}
                  </div>
                  {musicasExibidas.map((m, i) => (
                    <div 
                      key={m.id} 
                      onClick={() => aoDarPlay(m)} 
                      className="group grid grid-cols-[16px_2fr_1fr_auto_auto] items-center gap-4 p-2 rounded hover:bg-white/5 cursor-pointer transition-all duration-200"
                    >
                      <span className="text-gray-400 font-medium group-hover:text-white">{i + 1}</span>

                      <div className="flex items-center gap-3">
                        <img src={`${API_URL}/uploads/${m.caminhoImagem}`} className="w-10 h-10 rounded shadow-md object-cover shrink-0" alt="Capa" />
                        <div className="overflow-hidden">
                          <p className={`font-semibold truncate ${musicaAtual?.id === m.id ? 'text-[#1db954]' : 'text-white'}`}>{m.titulo}</p>
                          <p className="text-xs text-gray-400 group-hover:text-white truncate">{m.artista}</p>
                        </div>
                      </div>

                      <span className="text-gray-400 text-sm truncate group-hover:text-white">{m.album || "Single"}</span>
                      <span className="text-gray-400 text-sm font-medium">{formatarTempo(m.duracao)}</span>
                      
                      {/* BOTÃO PARA ADICIONAR MÚSICA NA PLAYLIST */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          if(playlists.length === 0) return alert("Crie uma playlist no menu lateral primeiro!");
                          
                          const opcoes = playlists.map((p, idx) => `${idx + 1} - ${p.nome}`).join('\n');
                          const escolha = window.prompt(`Digite o número da playlist para adicionar '${m.titulo}':\n\n${opcoes}`);
                          const index = parseInt(escolha) - 1;
                          if (!isNaN(index) && playlists[index]) {
                            const novaLista = [...playlists];
                            if (!novaLista[index].musicasIds.includes(m.id)) {
                              novaLista[index].musicasIds.push(m.id);
                              setPlaylists(novaLista);
                              if (usuario) localStorage.setItem(`playlists_${usuario.email}`, JSON.stringify(novaLista));
                              alert("Música adicionada!");
                            } else {
                              alert("Essa música já está na playlist!");
                            }
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-opacity p-2"
                        title="Adicionar à Playlist"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                // --- MENSAGEM QUANDO VAZIO OU BUSCA NÃO ENCONTRADA ---
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 animate-fadeIn">
                  {termoBusca !== '' ? (
                    <>
                      <Search size={64} className="mb-4 opacity-20" />
                      <h3 className="text-xl font-bold text-white mb-2">Nenhum resultado encontrado</h3>
                      <p className="text-sm">Não encontramos nada para "<span className="text-white font-bold">{termoBusca}</span>".</p>
                    </>
                  ) : (
                    <>
                      <MusicNote size={64} className="mb-4 opacity-20" />
                      <h3 className="text-xl font-bold text-white mb-2">Está meio vazio por aqui...</h3>
                      <p className="text-sm">Vá para a Home e clique no ícone "+" ao lado das músicas para adicioná-las.</p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* --- AREA: PLAYER BAR (RODAPÉ) --- */}

<footer className="h-24 bg-black px-4 flex items-center justify-between z-50 shadow-2xl">

        <div className="flex items-center gap-4 w-[30%]">
          {musicaAtual && (
            <div className="flex items-center gap-4 animate-fadeIn">
              <img src={`${API_URL}/uploads/${musicaAtual.caminhoImagem}`} className="w-14 h-14 rounded shadow-lg object-cover" />
              <div className="max-w-[180px]">
                <p className="text-sm font-bold text-white truncate hover:underline cursor-pointer">{musicaAtual.titulo}</p>
                <p className="text-[11px] text-gray-400 truncate hover:text-white cursor-pointer">{musicaAtual.artista}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 w-[40%]">
          <div className="flex items-center gap-6">
            <button onClick={() => skip(-1)} className="text-gray-400 hover:text-white transition-all"><SkipBack /></button>
            <button onClick={() => musicaAtual && aoDarPlay(musicaAtual)} className="hover:scale-105 transition-transform">
              {estaTocando ? <PauseCircle /> : <PlayCircle />}
            </button>
            <button onClick={() => skip(1)} className="text-gray-400 hover:text-white transition-all"><SkipForward /></button>
          </div>
          <div className="w-full flex items-center gap-3 text-[11px] text-gray-400 font-medium group">
             <span>{formatarTempo(tempoAtual)}</span>
             <input type="range" min="0" max={duracaoTotal || 0} step="0.1" value={tempoAtual} onChange={(e) => { audioRef.current.currentTime = e.target.value; setTempoAtual(e.target.value); }}
                onMouseEnter={() => setHoverProgresso(true)} onMouseLeave={() => setHoverProgresso(false)}
                style={{ background: `linear-gradient(to right, ${hoverProgresso ? '#1db954' : '#ffffff'} ${progressPercent}%, #4d4d4d ${progressPercent}%)` }}
                className="flex-1 h-1 rounded-full cursor-pointer appearance-none transition-all" />
             <span>{formatarTempo(duracaoTotal)}</span>
          </div>
        </div>

        <div className="w-[30%] flex justify-end items-center gap-3 text-gray-400 group">
          <VolumeIcons volume={volume} />
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))}
            onMouseEnter={() => setHoverVolume(true)} onMouseLeave={() => setHoverVolume(false)}
            style={{ background: `linear-gradient(to right, ${hoverVolume ? '#1db954' : '#ffffff'} ${volumePercent}%, #4d4d4d ${volumePercent}%)` }}
            className="w-24 h-1 rounded-full cursor-pointer appearance-none transition-all" />
        </div>
      </footer>

      <audio ref={audioRef} onEnded={() => skip(1)} onTimeUpdate={() => {setTempoAtual(audioRef.current.currentTime); setDuracaoTotal(audioRef.current.duration);}}
        onPlay={() => setEstaTocando(true)} onPause={() => setEstaTocando(false)} />
       {/* --- MODAL DE AUTENTICAÇÃO (LOGIN / CADASTRO) --- */}
{mostrarAuth && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
    <div className="bg-[#181818] w-full max-w-sm p-10 rounded-xl shadow-2xl border border-white/5 animate-fadeIn">
      
      <div className="flex justify-center mb-6">
        <h2 className="text-3xl font-black text-[#1db954]">Lovefy</h2>
      </div>

      <h3 className="text-center font-bold text-xl mb-6">
        {estaCadastrando ? 'Crie sua conta gratuita' : 'Para continuar, faça login.'}
      </h3>
      
      <form onSubmit={estaCadastrando ? realizarCadastro : realizarLogin} className="flex flex-col gap-4">
        
        {estaCadastrando && (
          <input 
            type="text" placeholder="Seu nome" 
            className="bg-[#3e3e3e] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954]"
            onChange={e => setDadosAuth({...dadosAuth, nome: e.target.value})} required 
          />
        )}

        <input 
          type="email" placeholder="E-mail" 
          className="bg-[#3e3e3e] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954]"
          onChange={e => setDadosAuth({...dadosAuth, email: e.target.value})} required 
        />
        
        <input 
          type="password" placeholder="Senha" 
          className="bg-[#3e3e3e] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954]"
          onChange={e => setDadosAuth({...dadosAuth, senha: e.target.value})} required 
        />

        <button type="submit" className="bg-[#1db954] text-black font-bold py-3 rounded-full mt-4 hover:scale-105 transition-all">
          {estaCadastrando ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <p className="text-sm text-gray-400">
          {estaCadastrando ? 'Já tem uma conta?' : 'Não tem uma conta?'}
        </p>
        <button 
          onClick={() => setEstaCadastrando(!estaCadastrando)}
          className="text-white font-bold hover:underline mt-2"
        >
          {estaCadastrando ? 'Faça login aqui' : 'Inscreva-se no Lovefy'}
        </button>
      </div>

      <button onClick={() => setMostrarAuth(false)} className="w-full text-xs text-gray-500 hover:text-white mt-6 transition-colors">
        Fechar
      </button>
    </div>
  </div>
)}{/* --- MODAL DE CRIAR PLAYLIST --- */}
      {mostrarModalPlaylist && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#181818] w-full max-w-sm p-8 rounded-xl shadow-2xl border border-white/5 animate-fadeIn">
            <h2 className="text-2xl font-black mb-6">Nova Playlist</h2>
            
            <form onSubmit={criarNovaPlaylistVisual} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400">Nome</label>
                <input 
                  type="text" 
                  placeholder="Ex: Rock Anos 80"
                  className="bg-[#3e3e3e] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954] text-white"
                  value={novaPlaylist.nome}
                  onChange={e => setNovaPlaylist({...novaPlaylist, nome: e.target.value})} 
                  required 
                />
              </div>

              {/* Toggle de Privacidade (Global ou Privada) */}
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-md mt-2">
                <div>
                  <p className="font-bold text-sm">Tornar Global?</p>
                  <p className="text-xs text-gray-400">Permitir que outros usuários ouçam.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={novaPlaylist.isGlobal}
                    onChange={e => setNovaPlaylist({...novaPlaylist, isGlobal: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1db954]"></div>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setMostrarModalPlaylist(false)} className="text-sm text-gray-400 hover:text-white font-bold">Cancelar</button>
                <button type="submit" className="bg-[#1db954] text-black font-bold py-2 px-6 rounded-full hover:scale-105 transition-all">Criar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default App