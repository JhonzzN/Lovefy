import { useState, useEffect, useRef } from 'react'
import logo from './assets/LogoLovefy.png'

// --- ÍCONES (SVG) ---
const Settings = ({size=20}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>);
const Globe = ({size=14}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>);
const Lock = ({size=14}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const PlayCircle = ({size=32}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" fill="white"></circle><polygon points="10 8 16 12 10 16 10 8" fill="black"></polygon></svg>);
const PauseCircle = ({size=32}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" fill="white"></circle><line x1="10" y1="15" x2="10" y2="9" stroke="black" strokeWidth="2"></line><line x1="14" y1="15" x2="14" y2="9" stroke="black" strokeWidth="2"></line></svg>);
const SkipBack = ({size=22}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>);
const SkipForward = ({size=22}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>);
const SearchIcon = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const Home = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>);
const Users = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
const MenuIcon = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const Bell = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>);
const User = ({size=20}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const Plus = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const MusicNote = ({size=24}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>);
const VolumeIcons = ({volume, size=20}) => {
    if (volume === 0) return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>;
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
};

const API_URL = 'http://localhost:8082';
const formatarTempo = (s) => isNaN(s) || s === 0 ? '0:00' : `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`;

function App() {
  // --- ESTADOS GERAIS ---
  const [musicas, setMusicas] = useState([]);
  const [usuariosList, setUsuariosList] = useState([]);
  const [meusAmigos, setMeusAmigos] = useState([]); 
  const [pedidosEnviados, setPedidosEnviados] = useState([]); 
  const [notificacoes, setNotificacoes] = useState([]); 
  const [historico, setHistorico] = useState([]);

  // --- PLAYER ---
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [estaTocando, setEstaTocando] = useState(false);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [duracaoTotal, setDuracaoTotal] = useState(0);
  const [volume, setVolume] = useState(0.5);

  // --- UI ---
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [notifAberta, setNotifAberta] = useState(false);
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const [hoverProgresso, setHoverProgresso] = useState(false);
  const [hoverVolume, setHoverVolume] = useState(false);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);

  // --- PESQUISA ---
  const [termoBusca, setTermoBusca] = useState('');
  const [pesquisaFoco, setPesquisaFoco] = useState(false);
  const [viewAtiva, setViewAtiva] = useState(null);

  // --- PLAYLISTS ---
  const [playlists, setPlaylists] = useState([]);
  const [playlistAtiva, setPlaylistAtiva] = useState(null); 
  const [mostrarModalPlaylist, setMostrarModalPlaylist] = useState(false);
  const [novaPlaylist, setNovaPlaylist] = useState({ nome: '', isGlobal: false });

  // --- AUTENTICAÇÃO ---
  const [usuario, setUsuario] = useState(null);
  const [mostrarAuth, setMostrarAuth] = useState(false); 
  const [estaCadastrando, setEstaCadastrando] = useState(false);
  const [dadosAuth, setDadosAuth] = useState({ nome: '', email: '', senha: '' });
  const [form, setForm] = useState({ titulo: '', artista: '', album: '', isAlbum: false, arquivoMp3: null, arquivoImagem: null, previewImagem: null });

  const [configuracoes, setConfiguracoes] = useState({ nome: '', sobre: '', contaPrivada: false, fotoPerfil: null });

  const audioRef = useRef(null);

  // --- CARREGAR DADOS ---
  const carregarDados = async () => {
    try {
      const resMusicas = await fetch(`${API_URL}/musicas`);
      if (resMusicas.ok) setMusicas(await resMusicas.json());
      const resUsuarios = await fetch(`${API_URL}/usuarios`);
      if (resUsuarios.ok) setUsuariosList(await resUsuarios.json());
    } catch (err) { console.error("Erro ao carregar dados:", err); }
  };

  useEffect(() => {
    carregarDados();
    if (!usuario) setMostrarAuth(true);
  }, []);

  useEffect(() => {
    if (usuario && usuario.email) {
      const gPlaylists = localStorage.getItem(`playlists_${usuario.email}`);
      if (gPlaylists) setPlaylists(JSON.parse(gPlaylists)); else setPlaylists([]);
      const gAmigos = localStorage.getItem(`amigos_${usuario.email}`);
      if (gAmigos) setMeusAmigos(JSON.parse(gAmigos)); else setMeusAmigos([]);
      const gPedidos = localStorage.getItem(`pedidosEnviados_${usuario.email}`);
      if (gPedidos) setPedidosEnviados(JSON.parse(gPedidos)); else setPedidosEnviados([]);
      const gNotifs = localStorage.getItem(`notificacoes_${usuario.email}`);
      if (gNotifs) setNotificacoes(JSON.parse(gNotifs)); else setNotificacoes([]);
      const gHistorico = localStorage.getItem(`historico_${usuario.email}`);
      if (gHistorico) setHistorico(JSON.parse(gHistorico)); else setHistorico([]);
      const gConfig = localStorage.getItem(`config_${usuario.email}`);
      if (gConfig) setConfiguracoes(JSON.parse(gConfig)); else setConfiguracoes({ nome: usuario.nome, sobre: '', contaPrivada: false, fotoPerfil: null });
    } else {
      setPlaylists([]); setMeusAmigos([]); setPedidosEnviados([]); setNotificacoes([]); setHistorico([]);
    }
    setPlaylistAtiva(null); setViewAtiva(null);
  }, [usuario]);


  // --- FUNÇÕES GLOBAIS ---
  const adicionarAoHistorico = (item, tipo) => {
    if (!usuario) return;
    const idUnico = tipo === 'artist' ? item : (item.id || item.email);
    const novoItem = { tipo, data: item, idUnico };
    setHistorico(prev => {
      const filtrado = prev.filter(i => i.idUnico !== idUnico);
      const atualizado = [novoItem, ...filtrado].slice(0, 6);
      localStorage.setItem(`historico_${usuario.email}`, JSON.stringify(atualizado));
      return atualizado;
    });
  };

  const lidarComFotoPerfil = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setConfiguracoes({ ...configuracoes, fotoPerfil: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const salvarConfiguracoes = (e) => {
    e.preventDefault(); if (!usuario) return;
    localStorage.setItem(`config_${usuario.email}`, JSON.stringify(configuracoes));
    setUsuario({ ...usuario, nome: configuracoes.nome });
    alert('Configurações salvas com sucesso!');
  };

  // LÓGICA REDE SOCIAL
  const enviarPedidoAmizade = (amigoEmail) => {
    if (!usuario) return alert("Faça login!");
    const novosPedidos = [...pedidosEnviados, amigoEmail];
    setPedidosEnviados(novosPedidos); localStorage.setItem(`pedidosEnviados_${usuario.email}`, JSON.stringify(novosPedidos));
    const gavetaAlvo = localStorage.getItem(`notificacoes_${amigoEmail}`);
    const notifsAlvo = gavetaAlvo ? JSON.parse(gavetaAlvo) : [];
    notifsAlvo.push({ id: Date.now(), tipo: 'PEDIDO_AMIZADE', de: { nome: usuario.nome, email: usuario.email } });
    localStorage.setItem(`notificacoes_${amigoEmail}`, JSON.stringify(notifsAlvo));
    alert("Pedido de amizade enviado!");
  };

  const responderPedido = (notif, aceitar) => {
    if (aceitar) {
      const meusNovosAmigos = [...meusAmigos, notif.de.email];
      setMeusAmigos(meusNovosAmigos); localStorage.setItem(`amigos_${usuario.email}`, JSON.stringify(meusNovosAmigos));
      const gavetaAmigosDele = localStorage.getItem(`amigos_${notif.de.email}`);
      const amigosDele = gavetaAmigosDele ? JSON.parse(gavetaAmigosDele) : [];
      amigosDele.push(usuario.email); localStorage.setItem(`amigos_${notif.de.email}`, JSON.stringify(amigosDele));
      alert(`${notif.de.nome} agora é seu amigo!`);
    }
    const novasNotifs = notificacoes.filter(n => n.id !== notif.id);
    setNotificacoes(novasNotifs); localStorage.setItem(`notificacoes_${usuario.email}`, JSON.stringify(novasNotifs));
    setNotifAberta(false);
  };

  const removerAmigo = (amigoEmail) => {
    if(!window.confirm("Deseja mesmo remover este amigo?")) return;
    const meusNovos = meusAmigos.filter(e => e !== amigoEmail);
    setMeusAmigos(meusNovos); localStorage.setItem(`amigos_${usuario.email}`, JSON.stringify(meusNovos));
    const gavetaAmigosDele = localStorage.getItem(`amigos_${amigoEmail}`);
    if (gavetaAmigosDele) {
        const amigosDele = JSON.parse(gavetaAmigosDele).filter(e => e !== usuario.email);
        localStorage.setItem(`amigos_${amigoEmail}`, JSON.stringify(amigosDele));
    }
  };

  // --- LÓGICA DE PLAYLIST ---
  const adicionarNaPlaylist = (m) => {
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
      } else alert("Essa música já está na playlist!");
    }
  };

  const criarNovaPlaylistVisual = (e) => {
    e.preventDefault();
    if (novaPlaylist.nome.trim() !== '') {
      const nova = { id: Date.now(), nome: novaPlaylist.nome, isGlobal: novaPlaylist.isGlobal, musicasIds: [] };
      const novasPlaylists = [...playlists, nova];
      setPlaylists(novasPlaylists); 
      if (usuario) localStorage.setItem(`playlists_${usuario.email}`, JSON.stringify(novasPlaylists));
      setMostrarModalPlaylist(false); setNovaPlaylist({ nome: '', isGlobal: false }); setPlaylistAtiva(nova); 
    }
  };

  // --- GERADOR DE LISTAS PARA EXIBIÇÃO ---
  const pegarCapaPlaylist = (musicasIds) => {
    if (!musicasIds || musicasIds.length === 0) return null;
    const primeiraMusica = musicas.find(m => m.id === musicasIds[0]);
    return primeiraMusica ? `${API_URL}/uploads/${primeiraMusica.caminhoImagem}` : null;
  };

  const musicasExibidas = playlistAtiva 
    ? musicas.filter(m => playlistAtiva.musicasIds?.includes(m.id))
    : viewAtiva
      ? (viewAtiva.type === 'artist' || viewAtiva.type === 'user' 
          ? musicas.filter(m => m.artista.toLowerCase() === (viewAtiva.name || viewAtiva.data.nome).toLowerCase()) 
          : musicas.filter(m => m.album === viewAtiva.name))
      : (termoBusca !== '' && !pesquisaFoco)
        ? musicas.filter(m => {
            const t = termoBusca.toLowerCase();
            return (m.titulo.toLowerCase().includes(t) || m.artista.toLowerCase().includes(t) || (m.album && m.album.toLowerCase().includes(t)));
          })
        : musicas;


  // --- CONTROLES DE ÁUDIO LOCAIS ---
  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);
  
  const aoDarPlay = (m) => {
    adicionarAoHistorico(m, 'musica'); 
    if (musicaAtual?.id === m.id) {
      estaTocando ? audioRef.current.pause() : audioRef.current.play();
      setEstaTocando(!estaTocando);
    } else {
      setMusicaAtual(m);
      setTimeout(() => {
        if(audioRef.current) {
            audioRef.current.src = `${API_URL}/uploads/${m.caminhoMp3}`;
            audioRef.current.play().catch(e => console.error("Erro no play", e));
            setEstaTocando(true);
        }
      }, 50);
    }
  };

  const skip = (dir) => {
    const listaAtual = musicasExibidas.length > 0 ? musicasExibidas : musicas;
    if (listaAtual.length === 0) return;

    let idx = listaAtual.findIndex(m => m.id === musicaAtual?.id);
    if (idx === -1) idx = 0; 
    
    let nextIdx = idx + dir;
    if (nextIdx >= listaAtual.length) nextIdx = 0;
    if (nextIdx < 0) nextIdx = listaAtual.length - 1;
    
    const next = listaAtual[nextIdx];
    if (next) aoDarPlay(next);
  };

  const realizarCadastro = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/usuarios/cadastrar`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dadosAuth) });
      if (res.ok) { const u = await res.json(); setUsuario({ nome: u.nome, email: u.email, role: 'USER' }); setMostrarAuth(false); carregarDados(); } 
      else alert(`Erro ao cadastrar.`);
    } catch (err) { alert("Servidor Offline!"); }
  };

  const realizarLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/usuarios/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: dadosAuth.email, senha: dadosAuth.senha }) });
      if (res.ok) { const u = await res.json(); setUsuario({ nome: u.nome, email: u.email, role: (u.email === 'admin@lovefy.com' || u.tipo === 'admin') ? 'ADMIN' : 'USER' }); setMostrarAuth(false); } 
      else alert("E-mail ou senha incorretos!");
    } catch (err) { alert("Erro ao conectar com o servidor!"); }
  };

  const salvarMusica = async (e) => {
    e.preventDefault(); const formData = new FormData(); formData.append('titulo', form.titulo); formData.append('artista', form.artista); formData.append('album', form.album); formData.append('mp3', form.arquivoMp3); formData.append('imagem', form.arquivoImagem);
    try {
      const res = await fetch(`${API_URL}/musicas`, { method: 'POST', body: formData });
      if (res.ok) { alert("Música salva!"); setMostrarAdmin(false); carregarDados(); } else alert("Erro ao salvar música.");
    } catch (err) { console.error(err); }
  };

  const progressPercent = (tempoAtual / duracaoTotal) * 100 || 0;
  const volumePercent = volume * 100;

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden font-sans select-none">
      
      {/* HEADER E PESQUISA FLUTUANTE */}
      <header className="h-16 bg-black/95 backdrop-blur-md z-50 flex items-center justify-between px-6 shadow-xl relative">
        <div className="flex items-center gap-4"><h1 className="text-3xl font-black text-[#1db954] tracking-tighter cursor-pointer hover:scale-105 transition-transform">Lovefy</h1></div>
        
        <div className="flex-1 max-w-md mx-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 z-10"><SearchIcon size={18} /></div>
          
          <input 
            type="text" placeholder="Música, Artista ou Usuário..." value={termoBusca}
            onFocus={() => setPesquisaFoco(true)}
            onBlur={() => setTimeout(() => setPesquisaFoco(false), 200)} 
            onChange={(e) => {
              setTermoBusca(e.target.value);
              if (e.target.value.trim() !== '') { setPlaylistAtiva(null); setMostrarAdmin(false); }
            }}
            className="w-full h-10 bg-[#2a2a2a] text-white rounded-full pl-10 pr-4 outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder-gray-500 font-medium text-sm relative z-20" 
          />

          {pesquisaFoco && termoBusca.trim() !== '' && (
            <div className="absolute top-12 left-0 w-full bg-[#282828] border border-white/5 rounded-xl shadow-2xl z-50 max-h-[400px] overflow-y-auto p-2 animate-fadeIn flex flex-col gap-1">
              
              {/* RESULTADOS LOCAIS (Músicas) */}
              {musicas.filter(m => m.titulo.toLowerCase().includes(termoBusca.toLowerCase())).slice(0, 3).map(m => (
                <div key={`musica-${m.id}`} onClick={() => { aoDarPlay(m); setPesquisaFoco(false); setTermoBusca(''); }} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors group">
                  <img src={`${API_URL}/uploads/${m.caminhoImagem}`} className="w-10 h-10 rounded object-cover shadow-md" alt="Capa" />
                  <div className="flex flex-col flex-1 overflow-hidden"><span className="text-sm font-bold text-white truncate group-hover:text-[#1db954]">{m.titulo}</span><span className="text-xs text-gray-400 truncate">Música • {m.artista}</span></div>
                  <button onClick={(e) => { e.stopPropagation(); adicionarNaPlaylist(m); }} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white p-2"><Plus size={18} /></button>
                </div>
              ))}
              
              {/* ARTISTAS */}
              {[...new Set(musicas.filter(m => m.artista.toLowerCase().includes(termoBusca.toLowerCase())).map(m => m.artista))].slice(0, 2).map(artista => (
                <div key={`artista-${artista}`} onClick={() => { setViewAtiva({ type: 'artist', name: artista }); adicionarAoHistorico(artista, 'artist'); setPesquisaFoco(false); setPlaylistAtiva(null); setMostrarAdmin(false); setTermoBusca(''); }} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0 shadow-md"><User /></div>
                  <div className="flex flex-col flex-1 overflow-hidden"><span className="text-sm font-bold text-white truncate group-hover:text-[#1db954]">{artista}</span><span className="text-xs text-gray-400">Artista</span></div>
                </div>
              ))}

              {/* ÁLBUNS */}
              {[...new Map(musicas.filter(m => m.album && m.album.toLowerCase().includes(termoBusca.toLowerCase())).map(m => [m.album, m])).values()].slice(0, 2).map(m => (
                <div key={`album-${m.album}`} onClick={() => { setViewAtiva({ type: 'album', name: m.album, capa: m.caminhoImagem, artista: m.artista }); adicionarAoHistorico(m, 'album'); setPesquisaFoco(false); setPlaylistAtiva(null); setMostrarAdmin(false); setTermoBusca(''); }} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors group">
                  <img src={`${API_URL}/uploads/${m.caminhoImagem}`} className="w-10 h-10 rounded object-cover shadow-md" alt="Capa Álbum" />
                  <div className="flex flex-col flex-1 overflow-hidden"><span className="text-sm font-bold text-white truncate group-hover:text-[#1db954]">{m.album}</span><span className="text-xs text-gray-400 truncate">Álbum • {m.artista}</span></div>
                </div>
              ))}

              {/* USUÁRIOS */}
              {usuariosList.filter(u => u.nome.toLowerCase().includes(termoBusca.toLowerCase()) && u.email !== usuario?.email).slice(0, 2).map(u => (
                <div key={`user-${u.id}`} onClick={() => { setViewAtiva({ type: 'user', data: u }); adicionarAoHistorico(u, 'user'); setPesquisaFoco(false); setPlaylistAtiva(null); setMostrarAdmin(false); setTermoBusca(''); }} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1db954] to-blue-500 flex items-center justify-center shrink-0 shadow-md text-white font-bold">{u.nome[0].toUpperCase()}</div>
                  <div className="flex flex-col flex-1 overflow-hidden"><span className="text-sm font-bold text-white truncate group-hover:text-[#1db954]">{u.nome}</span><span className="text-xs text-gray-400">Perfil de Usuário</span></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 relative">
          {usuario && (
            <div className="relative">
              <button onClick={() => setNotifAberta(!notifAberta)} className="text-gray-400 hover:text-white transition-colors p-1 relative"><Bell />{notificacoes.length > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></span>}</button>
              {notifAberta && (
                <div className="absolute top-10 right-0 bg-[#282828] shadow-2xl rounded-md p-2 w-72 animate-fadeIn z-50 border border-white/5 max-h-96 overflow-y-auto">
                  <h4 className="text-sm font-bold p-2 border-b border-white/5 mb-2">Notificações</h4>
                  {notificacoes.length === 0 ? <p className="text-xs text-gray-400 p-2 text-center">Nenhuma notificação nova.</p> : notificacoes.map(n => (
                      <div key={n.id} className="bg-white/5 p-3 rounded-md mb-2 flex flex-col gap-2">
                        <p className="text-xs"><strong className="text-white">{n.de.nome}</strong> quer ser seu amigo.</p>
                        <div className="flex gap-2">
                          <button onClick={() => responderPedido(n, true)} className="flex-1 bg-[#1db954] text-black text-xs font-bold py-1.5 rounded">Aceitar</button>
                          <button onClick={() => responderPedido(n, false)} className="flex-1 bg-white/10 text-white text-xs font-bold py-1.5 rounded">Recusar</button>
                        </div>
                      </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {usuario ? (
            <button onClick={() => setPerfilAberto(!perfilAberto)} className="bg-white/10 rounded-full p-1 flex items-center transition border border-transparent hover:scale-105">
              {configuracoes.fotoPerfil ? <img src={configuracoes.fotoPerfil} className="w-8 h-8 rounded-full object-cover shadow-md" alt="Perfil" /> : <div className="bg-gradient-to-tr from-[#1db954] to-blue-500 rounded-full text-white font-bold text-xs w-8 h-8 flex items-center justify-center shadow-md">{usuario.nome[0].toUpperCase()}</div>}
            </button>
          ) : <button onClick={() => setMostrarAuth(true)} className="bg-white text-black text-sm font-bold py-2 px-6 rounded-full hover:scale-105 transition-all">Entrar</button>}
          {perfilAberto && usuario && (
            <div className="absolute top-12 right-0 bg-[#282828] shadow-2xl rounded-md p-1 w-48 animate-fadeIn z-50 border border-white/5">
              <div className="p-3 border-b border-white/5"><p className="text-sm font-bold">{usuario.nome}</p>{usuario.role === 'ADMIN' ? <p className="text-[10px] text-red-500 font-black uppercase tracking-widest mt-1">👑 Administrador</p> : <p className="text-[10px] text-[#1db954] mt-1">Conta Verificada</p>}</div>
              <button onClick={() => { setViewAtiva({type: 'settings'}); setPerfilAberto(false); setPlaylistAtiva(null); setMostrarAdmin(false); setTermoBusca(''); }} className="w-full flex items-center gap-3 text-left p-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded transition-all mt-1"><Settings size={16} /> Configurações</button>
              <button onClick={() => { setUsuario(null); setPerfilAberto(false); setEstaCadastrando(false); setMostrarAuth(true); }} className="w-full text-left p-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-all mt-1 border-t border-white/5">Sair</button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden px-[8px] pb-[8px] gap-[8px]">
        {/* SIDEBAR */}
        <aside className={`${sidebarAberta ? 'w-64' : 'w-20'} shrink-0 bg-[#121212] flex flex-col pt-6 transition-all duration-300 ease-in-out rounded-lg overflow-hidden`}>
          <div onClick={() => setSidebarAberta(!sidebarAberta)} className="flex items-center h-12 w-full group cursor-pointer mb-2"><div className="w-20 flex justify-center shrink-0 text-gray-400 group-hover:text-white transition-colors"><MenuIcon /></div>{sidebarAberta && <span className="font-bold text-gray-400 group-hover:text-white transition-all duration-100 truncate pr-4">Minimizar</span>}</div>
          <nav className="flex flex-col gap-1">
            <div onClick={() => {setPlaylistAtiva(null); setViewAtiva(null); setMostrarAdmin(false); setTermoBusca('');}} className="flex items-center h-12 w-full group cursor-pointer"><div className="w-20 flex justify-center shrink-0 text-gray-400 group-hover:text-white"><Home size={24} /></div>{sidebarAberta && <span className={`font-bold transition-all truncate pr-4 ${!playlistAtiva && !viewAtiva && !mostrarAdmin ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>Home</span>}</div>
            {usuario && <div onClick={() => {setViewAtiva({ type: 'friends_list' }); setPlaylistAtiva(null); setMostrarAdmin(false); setTermoBusca('');}} className="flex items-center h-12 w-full group cursor-pointer"><div className="w-20 flex justify-center shrink-0 text-gray-400 group-hover:text-white"><Users size={24} /></div>{sidebarAberta && <span className={`font-bold transition-all truncate pr-4 ${viewAtiva?.type === 'friends_list' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>Amigos ({meusAmigos.length})</span>}</div>}
          </nav>
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2 flex-1 overflow-y-auto">
            <div className={`flex items-center w-full ${sidebarAberta ? 'px-6 justify-between' : 'justify-center'} mb-2`}>{sidebarAberta && <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors cursor-default">Sua Biblioteca</span>}<button onClick={() => setMostrarModalPlaylist(true)} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"><Plus size={20} /></button></div>
            <div className="flex flex-col gap-1 px-2 pb-4">
              {playlists.map(playlist => {
                const capa = pegarCapaPlaylist(playlist.musicasIds);
                const isAtiva = playlistAtiva?.id === playlist.id;
                return (
                  <div key={playlist.id} onClick={() => {setPlaylistAtiva(playlist); setViewAtiva(null); setMostrarAdmin(false);}} className={`flex items-center h-16 w-full group cursor-pointer hover:bg-white/10 transition-colors rounded-md ${sidebarAberta ? 'px-3 gap-3' : 'justify-center'} ${isAtiva ? 'bg-white/10' : ''}`}>
                    <div className="shrink-0 flex items-center justify-center">{capa ? <img src={capa} className={`rounded shadow-lg object-cover transition-all ${sidebarAberta ? 'w-12 h-12' : 'w-10 h-10'}`} alt="Capa" /> : <div className={`bg-[#282828] rounded flex items-center justify-center shrink-0 transition-all ${sidebarAberta ? 'w-12 h-12' : 'w-10 h-10'}`}><MusicNote size={sidebarAberta ? 24 : 20} className="text-[#b3b3b3]" /></div>}</div>
                    {sidebarAberta && <div className="flex flex-col overflow-hidden w-full pr-2"><div className="flex items-center justify-between"><span className={`font-bold truncate ${isAtiva ? 'text-[#1db954]' : 'text-gray-300 group-hover:text-white'}`}>{playlist.nome}</span><span className="text-gray-500 shrink-0 ml-2">{playlist.isGlobal ? <Globe size={14} /> : <Lock size={14} />}</span></div><span className="text-[11px] text-gray-500 truncate">Playlist • {playlist.musicasIds?.length || 0} músicas</span></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* MAIN CONTEÚDO */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1e1e1e] to-[#121212] p-8 rounded-lg relative">
          <div className="flex justify-between items-start mb-8 animate-fadeIn">
            {mostrarAdmin ? <h2 className="text-3xl font-black mt-4">Cadastrar Nova Faixa</h2>
            : viewAtiva?.type === 'settings' ? (
              <div className="max-w-2xl mx-auto animate-fadeIn mt-4">
                <div className="mb-8"><h2 className="text-4xl font-black text-white tracking-tighter">Configurações</h2><p className="text-gray-400 mt-2">Gerencie seus dados pessoais, perfil e privacidade da conta.</p></div>
                <form onSubmit={salvarConfiguracoes} className="flex flex-col gap-6 bg-[#181818] p-8 rounded-xl border border-white/5">
                  <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                    <div className="w-24 h-24 bg-gradient-to-tr from-[#1db954] to-blue-500 rounded-full flex items-center justify-center text-white font-black text-4xl shadow-xl overflow-hidden shrink-0">{configuracoes.fotoPerfil ? <img src={configuracoes.fotoPerfil} className="w-full h-full object-cover" alt="Sua Foto" /> : configuracoes.nome ? configuracoes.nome[0].toUpperCase() : 'U'}</div>
                    <div><label className="cursor-pointer bg-white/10 text-white text-sm font-bold py-2 px-6 rounded-full hover:bg-white/20 transition-all inline-block">Alterar Foto<input type="file" className="hidden" accept="image/*" onChange={lidarComFotoPerfil} /></label><p className="text-xs text-gray-500 mt-2">A foto será salva nas suas configurações.</p></div>
                  </div>
                  <div className="flex flex-col gap-2"><label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nome de Exibição</label><input type="text" value={configuracoes.nome} onChange={e => setConfiguracoes({...configuracoes, nome: e.target.value})} className="bg-[#282828] text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954]" required /></div>
                  <div className="flex flex-col gap-2"><label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sobre Mim</label><textarea value={configuracoes.sobre} onChange={e => setConfiguracoes({...configuracoes, sobre: e.target.value})} className="bg-[#282828] text-white p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954] resize-none h-24 placeholder-gray-600"></textarea></div>
                  <div className="flex items-center justify-between bg-[#282828] p-4 rounded-md mt-2"><div className="flex items-center gap-3"><Lock size={20} className="text-[#1db954]" /><div><p className="font-bold text-sm text-white">Conta Privada</p><p className="text-xs text-gray-400">Apenas seus amigos poderão ver o que você ouve e seu perfil.</p></div></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked={configuracoes.contaPrivada} onChange={e => setConfiguracoes({...configuracoes, contaPrivada: e.target.checked})} /><div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1db954]"></div></label></div>
                  <div className="flex justify-end pt-4"><button type="submit" className="bg-[#1db954] text-black font-bold py-3 px-10 rounded-full hover:scale-105 transition-all shadow-lg">Salvar Alterações</button></div>
                </form>
              </div>
            ) : viewAtiva?.type === 'friends_list' ? <div className="h-40 flex flex-col justify-end"><span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Comunidade</span><h2 className="text-5xl font-black text-white tracking-tighter truncate">Meus Amigos</h2></div>
            : viewAtiva ? (
              <div className="flex items-end gap-6 mb-8 animate-fadeIn">
                {viewAtiva.type === 'album' ? <img src={`${API_URL}/uploads/${viewAtiva.capa}`} className="w-56 h-56 shadow-2xl rounded object-cover" alt="Capa" />
                : viewAtiva.type === 'user' ? <div className="w-56 h-56 bg-gradient-to-tr from-[#1db954] to-blue-500 shadow-2xl rounded-full flex items-center justify-center text-8xl font-black text-white">{viewAtiva.data.nome[0].toUpperCase()}</div>
                : <div className="w-56 h-56 bg-[#282828] shadow-2xl rounded-full flex items-center justify-center"><User size={80} className="text-gray-500" /></div>}
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{viewAtiva.type === 'album' ? 'Álbum' : viewAtiva.type === 'user' ? 'Perfil' : 'Artista'}</span>
                  <h2 className="text-7xl font-black mt-2 mb-6 tracking-tighter leading-none truncate max-w-2xl">{viewAtiva.type === 'user' ? viewAtiva.data.nome : viewAtiva.name}</h2>
                  {viewAtiva.type === 'album' && <p className="text-white/70 font-bold text-lg">{viewAtiva.artista}</p>}
                  {viewAtiva.type === 'user' && usuario && usuario.email !== viewAtiva.data.email && (
                    <>{meusAmigos.includes(viewAtiva.data.email) ? <button onClick={() => removerAmigo(viewAtiva.data.email)} className="mt-2 py-2 px-8 rounded-full font-bold text-sm transition-all border border-white/30 text-white hover:border-white">Remover Amigo</button> : pedidosEnviados.includes(viewAtiva.data.email) ? <button disabled className="mt-2 py-2 px-8 rounded-full font-bold text-sm transition-all border border-gray-600 text-gray-400 cursor-not-allowed">Pedido Enviado</button> : <button onClick={() => enviarPedidoAmizade(viewAtiva.data.email)} className="mt-2 py-2 px-8 rounded-full font-bold text-sm transition-all border bg-[#1db954] text-black border-[#1db954] hover:scale-105">Adicionar Amigo</button>}</>
                  )}
                </div>
              </div>
            ) : termoBusca !== '' && !pesquisaFoco ? <div className="h-40 flex flex-col justify-end"><span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Busca</span><h2 className="text-5xl font-black text-white tracking-tighter truncate">Resultados para "{termoBusca}"</h2></div>
            : playlistAtiva ? (
              <div className="flex items-end gap-6">
                {pegarCapaPlaylist(playlistAtiva.musicasIds) ? <img src={pegarCapaPlaylist(playlistAtiva.musicasIds)} className="w-56 h-56 shadow-2xl rounded transform hover:scale-105 transition-all duration-500 object-cover" alt="Capa" /> : <div className="w-56 h-56 bg-[#282828] shadow-2xl rounded flex items-center justify-center"><MusicNote size={80} className="text-[#b3b3b3]" /></div>}
                <div><span className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">Playlist {playlistAtiva.isGlobal ? <Globe size={14} /> : <Lock size={14}/>}</span><h2 className="text-7xl font-black mt-2 mb-6 tracking-tighter leading-none">{playlistAtiva.nome}</h2><p className="text-white/70 font-bold text-sm">{playlistAtiva.isGlobal ? 'Pública' : 'Privada'} • {playlistAtiva.musicasIds?.length || 0} músicas</p></div>
              </div>
            ) : musicaAtual ? (
              <div className="flex items-end gap-6">
                <img src={`${API_URL}/uploads/${musicaAtual.caminhoImagem}`} className="w-56 h-56 shadow-2xl rounded transform hover:scale-105 transition-all duration-500 object-cover" alt="Capa" />
                <div><span className="text-xs font-bold uppercase tracking-widest text-gray-400">Tocando Agora</span><h2 className="text-7xl font-black mt-2 mb-6 tracking-tighter leading-none">{musicaAtual.titulo}</h2><p className="text-white/70 font-bold text-lg">{musicaAtual.artista} • {musicaAtual.album || 'Single'}</p></div>
              </div>
            ) : (
              <div className="flex flex-col w-full mb-8">
                <h2 className="text-3xl font-black text-white tracking-tighter mb-6">{usuario ? `Boa tarde, ${usuario.nome}` : 'Boa tarde'}</h2>
                {historico.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {historico.map((item, idx) => (
                      <div key={`hist-${idx}`} onClick={() => { if (item.tipo === 'musica') aoDarPlay(item.data); else if (item.tipo === 'user') setViewAtiva({ type: 'user', data: item.data }); else if (item.tipo === 'artist') setViewAtiva({ type: 'artist', name: item.data }); else if (item.tipo === 'album') setViewAtiva({ type: 'album', name: item.data.album, capa: item.data.caminhoImagem, artista: item.data.artista }); }} className="bg-white/5 hover:bg-white/20 transition-colors rounded-md flex items-center gap-4 cursor-pointer overflow-hidden group h-16">
                        {item.tipo === 'user' ? <div className="w-16 h-16 bg-gradient-to-tr from-[#1db954] to-blue-500 flex items-center justify-center shrink-0 shadow-md text-white font-bold text-xl">{item.data.nome[0].toUpperCase()}</div> : item.tipo === 'artist' ? <div className="w-16 h-16 bg-[#282828] flex items-center justify-center shrink-0 shadow-md"><User size={24} className="text-gray-400" /></div> : <img src={`${API_URL}/uploads/${item.data.caminhoImagem}`} className="w-16 h-16 object-cover shadow-md" alt="Capa" />}
                        <span className="font-bold text-sm text-white truncate pr-4">{item.tipo === 'artist' ? item.data : item.tipo === 'user' ? item.data.nome : item.tipo === 'album' ? item.data.album : item.data.titulo}</span>
                      </div>
                    ))}
                  </div>
                )}
                <h2 className="text-2xl font-bold text-white tracking-tighter mt-4 border-t border-white/5 pt-8">Feito para você</h2>
              </div>
            )}
            {usuario?.role === 'ADMIN' && <button onClick={() => { setMostrarAdmin(!mostrarAdmin); setViewAtiva(null); setPlaylistAtiva(null); setTermoBusca(''); }} className="bg-[#1db954] text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-all shadow-xl mt-4 shrink-0">{mostrarAdmin ? '← Voltar' : '+ Música'}</button>}
          </div>

          {mostrarAdmin ? (
            <div className="max-w-2xl mx-auto animate-fadeIn mt-8">
              <form onSubmit={salvarMusica} className="grid grid-cols-2 gap-6 bg-black/30 p-8 rounded-xl border border-white/5">
                <div className="col-span-2 flex flex-col items-center mb-4"><div className="w-40 h-40 bg-[#282828] rounded-md overflow-hidden border border-white/10 flex items-center justify-center mb-4">{form.previewImagem ? <img src={form.previewImagem} className="w-full h-full object-cover" alt="Preview" /> : <span className="text-gray-500 text-xs text-center p-4">Sem imagem<br/>selecionada</span>}</div><label className="cursor-pointer bg-white text-black text-xs font-bold py-2 px-4 rounded-full">Selecionar Capa <input type="file" className="hidden" accept="image/*" onChange={e => { const file = e.target.files[0]; if(file) setForm({...form, arquivoImagem: file, previewImagem: URL.createObjectURL(file)}); }} /></label></div>
                <div className="flex flex-col gap-2"><label className="text-xs font-bold text-gray-400">Título</label><input type="text" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} className="bg-[#3e3e3e] p-2 rounded outline-none focus:ring-1 focus:ring-[#1db954]" required /></div><div className="flex flex-col gap-2"><label className="text-xs font-bold text-gray-400">Artista</label><input type="text" value={form.artista} onChange={e => setForm({...form, artista: e.target.value})} className="bg-[#3e3e3e] p-2 rounded outline-none focus:ring-1 focus:ring-[#1db954]" required /></div><div className="flex flex-col gap-2"><label className="text-xs font-bold text-gray-400">Álbum (Opcional)</label><input type="text" value={form.album} onChange={e => setForm({...form, album: e.target.value})} className="bg-[#3e3e3e] p-2 rounded outline-none focus:ring-1 focus:ring-[#1db954]" /></div><div className="flex items-center gap-3 pt-6"><input type="checkbox" checked={form.isAlbum} onChange={e => setForm({...form, isAlbum: e.target.checked})} className="w-4 h-4 accent-[#1db954]" /><label className="text-sm font-bold">É um álbum?</label></div><div className="col-span-2 flex flex-col gap-2 mt-4"><label className="text-xs font-bold text-gray-400">Arquivo da Música (MP3)</label><input type="file" accept="audio/mp3" onChange={e => setForm({...form, arquivoMp3: e.target.files[0]})} className="text-sm text-gray-400" required /></div>
                <button type="submit" className="col-span-2 mt-6 bg-[#1db954] text-black font-bold py-3 rounded-full hover:scale-105 transition-all">Salvar na Biblioteca</button>
              </form>
            </div>
          ) : viewAtiva?.type === 'settings' ? null // Já desenhado acima
          : viewAtiva?.type === 'user' && !meusAmigos.includes(viewAtiva.data.email) && usuario?.email !== viewAtiva.data.email ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 animate-fadeIn"><Lock size={64} className="mb-4 opacity-20" /><h3 className="text-xl font-bold text-white mb-2">Conta Privada</h3><p className="text-sm">Adicione {viewAtiva.data.nome} como amigo para ver o perfil.</p></div>
          ) : viewAtiva?.type === 'friends_list' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {meusAmigos.length === 0 ? <div className="col-span-full flex flex-col items-center py-20 text-gray-400"><Users size={64} className="mb-4 opacity-20" /><h3 className="text-white font-bold mb-2">Ainda não tem amigos.</h3><p className="text-sm text-center">Pesquise por outros utilizadores!</p></div>
              : meusAmigos.map(email => { const amigo = usuariosList.find(u => u.email === email); if(!amigo) return null; return ( <div key={email} onClick={() => setViewAtiva({type: 'user', data: amigo})} className="bg-[#181818] p-4 rounded-lg flex flex-col items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors"><div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1db954] to-blue-500 flex items-center justify-center shadow-lg text-white font-black text-3xl">{amigo.nome[0].toUpperCase()}</div><span className="font-bold text-white">{amigo.nome}</span></div>) })}
            </div>
          ) : (
            <div className="w-full mt-4">
              {musicasExibidas.length > 0 ? (
                <>
                  <div className="grid grid-cols-[16px_2fr_1fr_auto_auto] gap-4 px-4 py-2 text-gray-400 text-xs uppercase tracking-widest border-b border-white/5 mb-4"><span>#</span><span>Título</span><span>Álbum</span><span>Duração</span><span></span></div>
                  {musicasExibidas.map((m, i) => (
                    <div key={m.id} onClick={() => aoDarPlay(m)} className="group grid grid-cols-[16px_2fr_1fr_auto_auto] items-center gap-4 p-2 rounded hover:bg-white/5 cursor-pointer transition-all duration-200">
                      <span className="text-gray-400 font-medium group-hover:text-white">{i + 1}</span>
                      <div className="flex items-center gap-3"><img src={`${API_URL}/uploads/${m.caminhoImagem}`} className="w-10 h-10 rounded shadow-md object-cover shrink-0" alt="Capa" /><div className="overflow-hidden"><p className={`font-semibold truncate ${musicaAtual?.id === m.id ? 'text-[#1db954]' : 'text-white'}`}>{m.titulo}</p><p className="text-xs text-gray-400 group-hover:text-white truncate">{m.artista}</p></div></div>
                      <span className="text-gray-400 text-sm truncate group-hover:text-white">{m.album || "Single"}</span>
                      <span className="text-gray-400 text-sm font-medium">{formatarTempo(m.duracao)}</span>
                      <button onClick={(e) => { e.stopPropagation(); adicionarNaPlaylist(m); }} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-opacity p-2" title="Adicionar à Playlist"><Plus size={20} /></button>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 animate-fadeIn">
                  {termoBusca !== '' && !viewAtiva ? <><SearchIcon size={64} className="mb-4 opacity-20" /><h3 className="text-xl font-bold text-white mb-2">Nenhum resultado encontrado</h3><p className="text-sm">Não encontramos nada para "<span className="text-white font-bold">{termoBusca}</span>".</p></> : viewAtiva?.type === 'user' ? null : <><MusicNote size={64} className="mb-4 opacity-20" /><h3 className="text-xl font-bold text-white mb-2">Está meio vazio por aqui...</h3><p className="text-sm">Vá para a Home e clique no ícone "+" ao lado das músicas para adicioná-las.</p></>}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* FOOTER PLAYER */}
      <footer className="h-24 bg-black px-4 flex items-center justify-between z-50 shadow-2xl relative">
        <div className="flex items-center gap-4 w-[30%]">
          {musicaAtual && (
            <div className="flex items-center gap-4 animate-fadeIn">
              <img src={`${API_URL}/uploads/${musicaAtual.caminhoImagem}`} className="w-14 h-14 rounded shadow-lg object-cover" />
              <div className="max-w-[180px]"><p className="text-sm font-bold text-white truncate hover:underline cursor-pointer">{musicaAtual.titulo}</p><p className="text-[11px] text-gray-400 truncate hover:text-white cursor-pointer">{musicaAtual.artista}</p></div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-3 w-[40%]">
          <div className="flex items-center gap-6">
            <button onClick={() => skip(-1)} className="text-gray-400 hover:text-white transition-all"><SkipBack /></button>
            <button onClick={() => musicaAtual && aoDarPlay(musicaAtual)} className="hover:scale-105 transition-transform">{estaTocando ? <PauseCircle /> : <PlayCircle />}</button>
            <button onClick={() => skip(1)} className="text-gray-400 hover:text-white transition-all"><SkipForward /></button>
          </div>
          <div className="w-full flex items-center gap-3 text-[11px] text-gray-400 font-medium group">
             <span>{formatarTempo(tempoAtual)}</span>
             <input type="range" min="0" max={duracaoTotal || 0} step="0.1" value={tempoAtual} onChange={(e) => { 
               const val = parseFloat(e.target.value); 
               setTempoAtual(val); 
               if (audioRef.current) audioRef.current.currentTime = val; 
             }} onMouseEnter={() => setHoverProgresso(true)} onMouseLeave={() => setHoverProgresso(false)} style={{ background: `linear-gradient(to right, ${hoverProgresso ? '#1db954' : '#ffffff'} ${progressPercent}%, #4d4d4d ${progressPercent}%)` }} className="flex-1 h-1 rounded-full cursor-pointer appearance-none transition-all" />
             <span>{formatarTempo(duracaoTotal)}</span>
          </div>
        </div>
        <div className="w-[30%] flex justify-end items-center gap-3 text-gray-400 group">
          <VolumeIcons volume={volume} />
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} onMouseEnter={() => setHoverVolume(true)} onMouseLeave={() => setHoverVolume(false)} style={{ background: `linear-gradient(to right, ${hoverVolume ? '#1db954' : '#ffffff'} ${(volume * 100)}%, #4d4d4d ${(volume * 100)}%)` }} className="w-24 h-1 rounded-full cursor-pointer appearance-none transition-all" />
        </div>
      </footer>

      {/* ÁUDIOS LOCAL */}
      <audio 
        ref={audioRef} 
        onEnded={() => skip(1)} 
        onTimeUpdate={() => setTempoAtual(audioRef.current.currentTime)} 
        onLoadedMetadata={() => setDuracaoTotal(audioRef.current.duration)}
        onPlay={() => setEstaTocando(true)} 
        onPause={() => setEstaTocando(false)} 
      />

      {/* MODAIS (MANTIDOS IGUAIS) */}
      {mostrarAuth && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#181818] w-full max-w-sm p-10 rounded-xl shadow-2xl border border-white/5 animate-fadeIn">
            <div className="flex justify-center mb-6"><h2 className="text-3xl font-black text-[#1db954]">Lovefy</h2></div><h3 className="text-center font-bold text-xl mb-6">{estaCadastrando ? 'Crie sua conta gratuita' : 'Para continuar, faça login.'}</h3>
            <form onSubmit={estaCadastrando ? realizarCadastro : realizarLogin} className="flex flex-col gap-4">{estaCadastrando && <input type="text" placeholder="Seu nome" className="bg-[#3e3e3e] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954]" onChange={e => setDadosAuth({...dadosAuth, nome: e.target.value})} required />}<input type="email" placeholder="E-mail" className="bg-[#3e3e3e] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954]" onChange={e => setDadosAuth({...dadosAuth, email: e.target.value})} required /><input type="password" placeholder="Senha" className="bg-[#3e3e3e] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954]" onChange={e => setDadosAuth({...dadosAuth, senha: e.target.value})} required /><button type="submit" className="bg-[#1db954] text-black font-bold py-3 rounded-full mt-4 hover:scale-105 transition-all">{estaCadastrando ? 'Cadastrar' : 'Entrar'}</button></form>
            <div className="mt-8 pt-6 border-t border-white/5 text-center"><p className="text-sm text-gray-400">{estaCadastrando ? 'Já tem uma conta?' : 'Não tem uma conta?'}</p><button onClick={() => setEstaCadastrando(!estaCadastrando)} className="text-white font-bold hover:underline mt-2">{estaCadastrando ? 'Faça login aqui' : 'Inscreva-se no Lovefy'}</button></div><button onClick={() => setMostrarAuth(false)} className="w-full text-xs text-gray-500 hover:text-white mt-6 transition-colors">Fechar</button>
          </div>
        </div>
      )}
      {mostrarModalPlaylist && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#181818] w-full max-w-sm p-8 rounded-xl shadow-2xl border border-white/5 animate-fadeIn"><h2 className="text-2xl font-black mb-6">Nova Playlist</h2><form onSubmit={criarNovaPlaylistVisual} className="flex flex-col gap-4"><div className="flex flex-col gap-2"><label className="text-xs font-bold text-gray-400">Nome</label><input type="text" placeholder="Ex: Rock Anos 80" className="bg-[#3e3e3e] p-3 rounded-md outline-none focus:ring-2 focus:ring-[#1db954] text-white" value={novaPlaylist.nome} onChange={e => setNovaPlaylist({...novaPlaylist, nome: e.target.value})} required /></div><div className="flex items-center justify-between bg-white/5 p-4 rounded-md mt-2"><div><p className="font-bold text-sm">Tornar Global?</p><p className="text-xs text-gray-400">Permitir que outros usuários ouçam.</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" checked={novaPlaylist.isGlobal} onChange={e => setNovaPlaylist({...novaPlaylist, isGlobal: e.target.checked})} /><div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1db954]"></div></label></div><div className="flex justify-end gap-3 mt-4"><button type="button" onClick={() => setMostrarModalPlaylist(false)} className="text-sm text-gray-400 hover:text-white font-bold">Cancelar</button><button type="submit" className="bg-[#1db954] text-black font-bold py-2 px-6 rounded-full hover:scale-105 transition-all">Criar</button></div></form></div>
        </div>
      )}
    </div>
  )
}
export default App