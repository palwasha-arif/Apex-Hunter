const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) {
    throw new Error(`API health check failed (${response.status})`);
  }
  return response.json();
}
