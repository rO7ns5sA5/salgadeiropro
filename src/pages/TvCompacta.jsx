import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, ExternalLink } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const GOLD = '#C9932A'
const NAVY = '#0B1729'

const categorias = ['Todos', 'Tutoriais', 'Receitas', 'Manutenção', 'Máquinas', 'Dicas']

const videos = [
  {
    id: 'J8k2mR2XVXY',
    titulo: 'Como usar a modeladora de salgados Pop 4.0',
    categoria: 'Tutoriais',
    duracao: '8:24',
    descricao: 'Passo a passo completo para operar a Pop 4.0',
  },
  {
    id: 'tQMkzb-GQMU',
    titulo: 'Massa de coxinha perfeita para modeladora',
    categoria: 'Receitas',
    duracao: '6:12',
    descricao: 'Receita e ponto ideal para modelar na máquina',
  },
  {
    id: 'F2kT9X3PLWQ',
    titulo: 'Limpeza e manutenção da modeladora Compacta',
    categoria: 'Manutenção',
    duracao: '5:45',
    descricao: 'Como limpar corretamente após cada uso',
  },
  {
    id: 'R9mNpK7VZEX',
    titulo: 'Black Inox — apresentação completa da máquina',
    categoria: 'Máquinas',
    duracao: '10:33',
    descricao: 'Conheça todos os recursos da linha Black Inox',
  },
  {
    id: 'W4kLpQ8MZRN',
    titulo: 'Regulagem do painel — massa, recheio e cortador',
    categoria: 'Tutoriais',
    duracao: '7:18',
    descricao: 'Como calibrar os ajustes para cada tipo de salgado',
  },
  {
    id: 'Y7nXpR5KVSM',
    titulo: 'Risole e bolinha — troca de bico passo a passo',
    categoria: 'Tutoriais',
    duracao: '4:55',
    descricao: 'Como trocar bico e mandíbula corretamente',
  },
  {
    id: 'B3pQmK9WZXL',
    titulo: 'Dicas para não rachar a coxinha na fritura',
    categoria: 'Dicas',
    duracao: '3:40',
    descricao: 'Erros comuns e como evitar',
  },
  {
    id: 'C8nLqP6YZMW',
    titulo: 'Inox Supreme — capacidade e ajustes de produção',
    categoria: 'Máquinas',
    duracao: '9:10',
    descricao: 'Produção profissional com a Inox Supreme',
  },
  {
    id: 'D2mRpN4XKVS',
    titulo: 'Massa de kibe e croquete para modeladora',
    categoria: 'Receitas',
    duracao: '5:30',
    descricao: 'Proporções e textura ideal para cada formato',
  },
  {
    id: 'E5kQmL7WZRY',
    titulo: 'Empanadeira Black Turbo — como usar e limpar',
    categoria: 'Máquinas',
    duracao: '6:48',
    descricao: 'Tutorial completo da empanadeira',
  },
]

function VideoCard({ video, onPlay }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#0F2040', border: '1px solid #1E3A5F' }}
    >
      {/* Thumbnail */}
      <button
        onClick={() => onPlay(video)}
        className="relative w-full block"
        style={{ aspectRatio: '16/9' }}
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.titulo}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div
          className="absolute inset-0 items-center justify-center flex-col gap-2"
          style={{ display: 'none', background: 'linear-gradient(135deg, #0F2040, #1E3A5F)' }}
        >
          <Play size={32} color={GOLD} />
          <span style={{ color: '#D0E8F5', fontSize: 12 }}>{video.titulo}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.25)' }}>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(201,147,42,0.9)' }}
          >
            <Play size={20} color="#fff" fill="#fff" />
          </div>
        </div>
        <div
          className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-bold"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff' }}
        >
          {video.duracao}
        </div>
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: 'rgba(201,147,42,0.9)', color: '#fff' }}
        >
          {video.categoria}
        </div>
      </button>

      {/* Info */}
      <div className="p-3">
        <p className="font-bold text-sm leading-tight" style={{ color: '#D0E8F5' }}>
          {video.titulo}
        </p>
        <p className="text-xs mt-1" style={{ color: '#4A7A9B' }}>
          {video.descricao}
        </p>
      </div>
    </div>
  )
}

function VideoPlayer({ video, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: '#000' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: NAVY }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ color: GOLD, fontSize: 14, fontWeight: 700 }}>← Voltar</span>
        </button>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
          style={{ color: '#D0E8F5', fontSize: 13 }}
        >
          <ExternalLink size={14} />
          YouTube
        </a>
      </div>

      {/* Player */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', backgroundColor: '#000' }}>
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>

      {/* Info */}
      <div className="p-4 flex-1" style={{ backgroundColor: NAVY }}>
        <p className="font-bold text-base" style={{ color: '#D0E8F5' }}>{video.titulo}</p>
        <p className="text-sm mt-1" style={{ color: '#4A7A9B' }}>{video.descricao}</p>
        <div className="flex items-center gap-2 mt-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(201,147,42,0.2)', border: '1px solid rgba(201,147,42,0.4)' }}
          >
            <Play size={14} color={GOLD} />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: GOLD }}>TV Compacta Print</p>
            <p className="text-xs" style={{ color: '#4A7A9B' }}>@tvcompactaprint</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TvCompacta() {
  const [categoria, setCategoria] = useState('Todos')
  const [videoAtivo, setVideoAtivo] = useState(null)

  const filtrados = videos.filter(v => categoria === 'Todos' || v.categoria === categoria)

  if (videoAtivo) {
    return <VideoPlayer video={videoAtivo} onClose={() => setVideoAtivo(null)} />
  }

  return (
    <PageLayout titulo="TV Compacta" dark>
      <div className="px-4 pt-4 pb-6">

        {/* Header */}
        <div
          className="rounded-2xl p-4 mb-5 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #0B1729 100%)', border: '1px solid #1E3A5F' }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,0,0,0.15)', border: '1px solid rgba(255,0,0,0.3)' }}
          >
            <span style={{ fontSize: 28 }}>📺</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-base" style={{ color: '#D0E8F5' }}>TV Compacta Print</p>
            <p className="text-xs mt-0.5" style={{ color: '#4A7A9B' }}>Tutoriais, receitas e dicas oficiais</p>
            <a
              href="https://www.youtube.com/@tvcompactaprint"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 mt-1"
              style={{ color: GOLD, fontSize: 12, fontWeight: 700 }}
            >
              <ExternalLink size={12} />
              Ver canal completo
            </a>
          </div>
        </div>

        {/* Categorias */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: categoria === cat ? GOLD : '#0F2040',
                color: categoria === cat ? '#fff' : '#6B9DC2',
                border: categoria === cat ? 'none' : '1px solid #1E3A5F',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de vídeos */}
        <div className="grid grid-cols-1 gap-4">
          {filtrados.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={setVideoAtivo} />
          ))}
        </div>

        {/* Link canal */}
        <a
          href="https://www.youtube.com/@tvcompactaprint"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mt-6 py-4 rounded-2xl font-bold text-sm"
          style={{ backgroundColor: '#0F2040', color: '#D0E8F5', border: '1px solid #1E3A5F' }}
        >
          <ExternalLink size={16} />
          Ver todos os vídeos no YouTube
        </a>
      </div>
    </PageLayout>
  )
}
