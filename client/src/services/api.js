const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) {
    throw new Error(`API health check failed (${response.status})`);
  }
  return response.json();
}

export async function generateAIGuide({ targetGame, region }) {
  const response = await fetch(`${API_BASE_URL}/api/ai/guide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targetGame, region }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || `Guide request failed (${response.status})`);
  }
  return result;
}
