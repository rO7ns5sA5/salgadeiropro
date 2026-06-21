import Header from './Header'
import BottomNav from './BottomNav'

export default function PageLayout({
  children,
  titulo,
  voltar = false,
  headerDireita = null,
  dark = false,
  semHeader = false,
  semNav = false,
  className = '',
}) {
  const bg = dark ? '#0B1729' : '#FAFAFA'

  return (
    <div className="flex flex-col min-h-svh" style={{ backgroundColor: bg }}>
      {!semHeader && (
        <Header titulo={titulo} voltar={voltar} direita={headerDireita} dark={dark} />
      )}

      <main
        className={`flex-1 overflow-y-auto ${className}`}
        style={{
          paddingTop: semHeader ? 0 : 56,
          paddingBottom: semNav ? 0 : 80,
        }}
      >
        <div style={{ maxWidth: 480, margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </main>

      {!semNav && <BottomNav dark={dark} />}
    </div>
  )
}
