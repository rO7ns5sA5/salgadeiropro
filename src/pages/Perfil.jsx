import { useNavigate } from 'react-router-dom'
import { User, Crown, ChevronRight, BookOpen, Calculator, Bot, Settings, LogOut, Award, TrendingUp } from 'lucide-react'
import PageLayout from '../components/PageLayout'

const GOLD = '#C9932A'
const NAVY = '#0B1729'

const usuario = {
  nome: 'Roberto Nunes',
  email: 'robertons5sa5@gmail.com',
  plano: 'pro',
  maquina: 'Pop 4.0',
  membro_desde: 'Janeiro 2025',
  salgados_calculados: 12500,
  receitas_salvas: 8,
  perguntas_roberto: 34,
}

function ItemMenu({ icon: Icon, label, valor = null, onClick, perigo = false }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: perigo ? '#FEF2F2' : '#FEF8EC' }}
      >
        <Icon size={17} color={perigo ? '#EF4444' : GOLD} />
      </div>
      <p className="flex-1 text-sm font-medium" style={{ color: perigo ? '#EF4444' : '#1A1A1A' }}>
        {label}
      </p>
      {valor && <p className="text-sm font-bold" style={{ color: GOLD }}>{valor}</p>}
      {!valor && <ChevronRight size={15} color="#D1D5DB" />}
    </button>
  )
}

export default function Perfil() {
  const navigate = useNavigate()
  const isPro = usuario.plano === 'pro'

  return (
    <PageLayout titulo="Perfil">
      {/* Avatar + info */}
      <div className="px-4 pt-5 flex flex-col items-center text-center">
        <div
          className="w-20 h-20 rounded-full overflow-hidden mb-3 flex items-center justify-center"
          style={{ border: `3px solid ${GOLD}`, backgroundColor: '#FEF8EC' }}
        >
          <img
            src="/images/especialista.jpeg"
            alt="Roberto"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="w-full h-full items-center justify-center" style={{ display: 'none' }}>
            <User size={32} color={GOLD} />
          </div>
        </div>
        <p className="font-bold text-xl" style={{ color: '#1A1A1A' }}>{usuario.nome}</p>
        <p className="text-sm mt-0.5" style={{ color: '#9CA3AF' }}>{usuario.email}</p>
        <p className="text-xs mt-1" style={{ color: '#666666' }}>Membro desde {usuario.membro_desde}</p>

        {isPro ? (
          <div
            className="flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: '#FEF8EC', border: `1.5px solid ${GOLD}` }}
          >
            <Crown size={13} color={GOLD} />
            <span className="text-sm font-bold" style={{ color: GOLD }}>Plano Pro</span>
          </div>
        ) : (
          <button
            className="flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: NAVY, border: 'none' }}
          >
            <Crown size={13} color={GOLD} />
            <span className="text-sm font-bold" style={{ color: GOLD }}>Assinar Pro — R$29,90/mês</span>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="px-4 mt-5 grid grid-cols-3 gap-3">
        {[
          { label: 'Salgados\ncalculados', valor: usuario.salgados_calculados.toLocaleString(), icon: TrendingUp },
          { label: 'Receitas\nsalvas',     valor: usuario.receitas_salvas,                       icon: BookOpen },
          { label: 'Perguntas\nao Roberto', valor: usuario.perguntas_roberto,                    icon: Bot },
        ].map(({ label, valor, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center p-3 rounded-2xl text-center"
            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
          >
            <Icon size={18} color={GOLD} />
            <p className="font-bold text-lg mt-1" style={{ color: '#1A1A1A' }}>{valor}</p>
            <p className="text-xs leading-tight mt-0.5 whitespace-pre-line" style={{ color: '#9CA3AF' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Minha máquina */}
      <div className="px-4 mt-4">
        <div
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ backgroundColor: NAVY }}
        >
          <div>
            <p className="text-xs" style={{ color: '#6B7280' }}>Minha máquina</p>
            <p className="font-bold text-base" style={{ color: GOLD }}>{usuario.maquina}</p>
            <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>Compacta Print</p>
          </div>
          <button
            onClick={() => navigate('/maquinas')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{ backgroundColor: 'rgba(201,147,42,0.2)', color: GOLD, border: '1px solid rgba(201,147,42,0.3)' }}
          >
            Ver ficha
          </button>
        </div>
      </div>

      {/* Menu */}
      <div
        className="mx-4 mt-4 rounded-2xl overflow-hidden divide-y"
        style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0', borderColor: '#F0F0F0' }}
      >
        <ItemMenu icon={BookOpen}   label="Minhas receitas salvas"  valor={`${usuario.receitas_salvas}`} onClick={() => navigate('/receitas')} />
        <ItemMenu icon={Calculator} label="Histórico de cálculos"                                         onClick={() => navigate('/historico')} />
        <ItemMenu icon={Award}      label="Meus certificados"                                             onClick={() => navigate('/treinamentos')} />
        <ItemMenu icon={Settings}   label="Configurações da conta"                                        onClick={() => {}} />
      </div>

      {!isPro && (
        <div
          className="mx-4 mt-4 p-4 rounded-2xl"
          style={{ backgroundColor: '#FEF8EC', border: `1.5px solid ${GOLD}` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Crown size={15} color={GOLD} />
            <p className="font-bold text-sm" style={{ color: '#1A1A1A' }}>Desbloqueie o Pro</p>
          </div>
          <ul className="space-y-1 mb-3">
            {['Receitas ilimitadas', 'Roberto IA ilimitado', 'Exportar PDF', 'Todas as máquinas'].map((f) => (
              <li key={f} className="flex gap-2 text-xs" style={{ color: '#666666' }}>
                <span style={{ color: GOLD }}>✓</span> {f}
              </li>
            ))}
          </ul>
          <button
            className="w-full py-3 rounded-xl font-bold text-sm"
            style={{ backgroundColor: GOLD, color: '#FFFFFF' }}
          >
            Assinar Pro — R$29,90/mês
          </button>
        </div>
      )}

      {/* Logout */}
      <div
        className="mx-4 mt-4 mb-4 rounded-2xl overflow-hidden"
        style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #F0F0F0' }}
      >
        <ItemMenu icon={LogOut} label="Sair da conta" onClick={() => {}} perigo />
      </div>

      <p className="text-center text-xs pb-4" style={{ color: '#D1D5DB' }}>
        Salgadeiro Pro v1.0 · Compacta Print
      </p>
    </PageLayout>
  )
}
