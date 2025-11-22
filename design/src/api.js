export const API_URLS = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003"
];

let currentServer = 0;

// Função com timeout REAL (3 segundos)
function fetchWithTimeout(url, options = {}, timeout = 3000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), timeout)
    )
  ]);
}

// Health-check automático
setInterval(async () => {
  try {
    await fetchWithTimeout(API_URLS[currentServer] + "/health", {}, 2000);
  } catch {
    console.log("Servidor caiu! Trocando...");
    currentServer = (currentServer + 1) % API_URLS.length;
  }
}, 5000);

export async function apiFetch(path, options = {}) {
  for (let i = 0; i < API_URLS.length; i++) {
    const index = (currentServer + i) % API_URLS.length;
    const url = API_URLS[index] + path;

    try {
      const res = await fetchWithTimeout(url, options, 3000);

      if (res.ok) {
        currentServer = index;
        return res;
      }

    } catch (error) {
      console.log(`Servidor indisponível: ${API_URLS[index]}`);
    }
  }

  throw new Error("Nenhum servidor disponível");
}
