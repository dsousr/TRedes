export const API_URLS = [
  "http://localhost:3003",
  "http://localhost:3002",
  "http://localhost:3001"
];

export async function apiFetch(path, options = {}) {
  for (const base of API_URLS) {
    try {
      const res = await fetch(base + path, options);
      if (!res.ok) continue;
      return res;
    } catch (err) {
      continue;
    }
  }

  throw new Error("Nenhum servidor disponível");
}
