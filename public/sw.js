const CACHE_NAME = 'salgadeiropro-v2'

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/images/banner_boteco.jpeg',
  '/images/logo_splash.png',
  '/images/especialista.jpeg',
  '/images/coxinha.jpeg',
  '/images/kibe_carne.jpeg',
  '/images/risole_tracesseiro.jpeg',
  '/images/enroladinho_salsicha.jpeg',
  '/images/esfirra.jpeg',
  '/images/bolinho_feijoada.jpeg',
  '/images/mini_pasteis.jpeg',
  '/images/mesa+produção.png',
  '/icons/icon-192.png',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        STATIC_ASSETS.map((url) => cache.add(url).catch(() => {}))
      )
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)

  // Não intercepta APIs externas
  if (
    url.hostname.includes('anthropic.com') ||
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('googleapis.com')
  ) {
    return
  }

  // Navegação: Network First com fallback para index.html (SPA)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
          return res
        })
        .catch(() => caches.match('/index.html'))
    )
    return
  }

  // Cache First para imagens e assets estáticos
  if (
    e.request.destination === 'image' ||
    e.request.destination === 'font' ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/images/')
  ) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        if (cached) return cached
        return fetch(e.request).then((res) => {
          if (res.ok) {
            const clone = res.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
          }
          return res
        }).catch(() => cached)
      })
    )
    return
  }

  // Stale While Revalidate para JS/CSS
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request).then((res) => {
        if (res.ok && url.origin === self.location.origin) {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
        }
        return res
      }).catch(() => cached)
      return cached || network
    })
  )
})
