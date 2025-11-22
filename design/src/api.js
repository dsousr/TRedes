export const API_URLS = [
  "http://192.168.0.101:3001",
  "http://192.168.0.102:3002",
  "http://192.168.0.103:3003"
];

let currentServer = 0;

// Health-check automático a cada 5 segundos
setInterval(async () => {
  try {
    await fetch(API_URLS[currentServer] + "/health");
  } catch {
    console.log("Servidor caiu! Trocando...");
    currentServer = (currentServer + 1) % API_URLS.length;
  }
}, 5000);

export async function apiFetch(path, options = {}) {
  for (let i = 0; i < API_URLS.length; i++) {
    const idx = (currentServer + i) % API_URLS.length;

    try {
      const res = await fetch(API_URLS[idx] + path, options);
      if (res.ok) {
        currentServer = idx;
        return res;
      }
    } catch (_) {}
  }

  throw new Error("Nenhum servidor disponível");
}
