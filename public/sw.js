const CACHE_NAME = 'salgadeiropro-v1'

const STATIC_ASSETS = [
  '/',
  '/index.html',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
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
  // Não intercepta requisições para APIs externas
  if (
    e.request.url.includes('api.anthropic.com') ||
    e.request.url.includes('supabase.co') ||
    e.request.url.includes('unsplash.com')
  ) {
    return
  }

  // Estratégia: Network First com fallback para cache (para navegação)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() =>
        caches.match('/index.html')
      )
    )
    return
  }

  // Cache First para assets estáticos (JS, CSS, fontes)
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached
      return fetch(e.request).then((res) => {
        if (res.ok && e.request.url.startsWith(self.location.origin)) {
          const clone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone))
        }
        return res
      })
    })
  )
})
