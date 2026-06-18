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
  const bg = dark ? '#061423' : '#F5F0E8'

  return (
    <div className="flex justify-center min-h-svh" style={{ backgroundColor: '#D8D0C4' }}>
      <div className="flex flex-col w-full min-h-svh" style={{ maxWidth: 480, backgroundColor: bg }}>
        {!semHeader && (
          <Header titulo={titulo} voltar={voltar} direita={headerDireita} dark={dark} />
        )}

        <main
          className={`flex-1 overflow-y-auto ${className}`}
          style={{
            paddingTop: semHeader ? 0 : 56,
            paddingBottom: semNav ? 0 : 64,
          }}
        >
          {children}
        </main>

        {!semNav && <BottomNav dark={dark} />}
      </div>
    </div>
  )
}
