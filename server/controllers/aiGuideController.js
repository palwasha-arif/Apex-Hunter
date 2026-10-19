const GEMINI_MODEL = "gemini-flash-latest";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

exports.generateAIGuide = async (request, response) => {
  const { targetGame, region } = request.body || {};

  if (
    typeof targetGame !== "string" ||
    typeof region !== "string" ||
    !targetGame.trim() ||
    !region.trim() ||
    targetGame.trim().length > 80 ||
    region.trim().length > 120
  ) {
    return response.status(400).json({
      error: "Provide a target or wildlife topic (up to 80 characters) and a region (up to 120 characters).",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(503).json({
      error: "AI field guides are not configured. Add GEMINI_API_KEY to server/.env.",
    });
  }

  const prompt = [
    "Create a concise beginner-friendly educational field guide as JSON.",
    `Topic or wildlife: ${targetGame.trim()}.`,
    `Region: ${region.trim()}.`,
    "Never invent local laws, seasons, or licensing requirements; tell readers to confirm current rules with their local wildlife authority.",
    "Focus on observing wildlife, habitat, responsible outdoor practice, certified hunter education, positive species identification, landowner permission, and leaving no trace. Do not recommend weapons, calibers, or harmful tactics.",
    "Return only JSON with title (string), habitatNotes (up to 2 short strings), trackingTips (up to 3 short strings), recommendedGear (up to 4 short strings), safetyWarnings (up to 4 short strings), and regulationsReminder (string).",
  ].join(" ");

  let upstream;
  try {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      upstream = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                habitatNotes: { type: "ARRAY", items: { type: "STRING" } },
                trackingTips: { type: "ARRAY", items: { type: "STRING" } },
                recommendedGear: { type: "ARRAY", items: { type: "STRING" } },
                safetyWarnings: { type: "ARRAY", items: { type: "STRING" } },
                regulationsReminder: { type: "STRING" },
              },
              required: [
                "title",
                "habitatNotes",
                "trackingTips",
                "recommendedGear",
                "safetyWarnings",
                "regulationsReminder",
              ],
            },
            maxOutputTokens: 1000,
            temperature: 0.3,
          },
        }),
        signal: AbortSignal.timeout(45000),
      });

      if (![429, 503].includes(upstream.status) || attempt === 1) break;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      return response.status(504).json({ error: "The field guide request timed out. Please try again." });
    }
    console.error("Gemini request failed:", error.message);
    return response.status(502).json({ error: "Could not reach the AI service. Please try again." });
  }

  if (!upstream.ok) {
    const status = upstream.status === 429 ? 503 : 502;
    console.error(`Gemini returned HTTP ${upstream.status}.`);
    return response.status(status).json({
      error:
        [429, 503].includes(upstream.status)
          ? "The AI service is busy or its quota is exhausted. Please try again later."
          : "The AI service rejected the request. Check the server API key and try again.",
    });
  }

  let payload;
  try {
    payload = await upstream.json();
  } catch (error) {
    console.error("Gemini returned invalid JSON:", error.message);
    return response.status(502).json({ error: "The AI service returned an invalid response." });
  }

  const text = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!text) {
    console.error("Gemini response contained no guide text.");
    return response.status(502).json({ error: "The AI service returned an empty guide." });
  }

  let guide;
  try {
    guide = JSON.parse(text);
  } catch (error) {
    console.error("Gemini guide was not valid JSON:", error.message);
    return response.status(502).json({ error: "The AI service returned a guide in an unexpected format." });
  }

  const listFields = [
    "habitatNotes",
    "trackingTips",
    "recommendedGear",
    "safetyWarnings",
  ];
  const validGuide =
    guide &&
    typeof guide.title === "string" &&
    listFields.every(
      (field) =>
        Array.isArray(guide[field]) &&
        guide[field].every((item) => typeof item === "string")
    ) &&
    typeof guide.regulationsReminder === "string";

  if (!validGuide) {
    console.error("Gemini guide did not match the expected field guide shape.");
    return response.status(502).json({ error: "The AI service returned a guide in an unexpected format." });
  }

  return response.json(guide);
};
