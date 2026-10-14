const CACHE_NAME = "task-manager-v3";

const FILES_TO_CACHE = [
    "./",
    "./index.html"
];

self.addEventListener("fetch", event => {
    const request = event.request;
     //console.log("Service Worker recibió:", event.request.url);
    // Solo procesar solicitudes GET
    if (request.method !== "GET") return;

    const url = new URL(request.url);

    // Solo procesar solicitudes del mismo origen
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        (async () => {
            // 1. Buscar primero en la caché
            const cached = await caches.match(request);

            if (cached) {
                return cached;
            }

            // 2. Si no existe, intentar descargarlo
            try {
                const response = await fetch(request);

                // 3. Guardar únicamente respuestas correctas
                if (response.ok && response.type === "basic") {
                    const cache = await caches.open(CACHE_NAME);

                    await cache.put(
                        request,
                        response.clone()
                    );
                }

                // 4. Devolver la respuesta al navegador
                return response;

            } catch (error) {
                // Si se intenta navegar sin conexión,
                // devolver el HTML principal, si está en caché.
                if (request.mode === "navigate") {
                    const fallback = await caches.match("./index.html");

                    if (fallback) {
                        return fallback;
                    }
                }

                throw error;
            }
        })()
    );
});