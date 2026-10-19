const { GoogleGenAI } = require('@google/genai');

exports.generateAIGuide = async (req, res) => {
  try {
    const { targetGame, region } = req.body; // e.g., "Oryx", "Punjab Region"

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `Provide a professional hunting field guide for hunting ${targetGame} in ${region}. Format response STRICTLY as a JSON object with keys: title, optimalCaliber, trackingTips (array of strings), recommendedGear (array of strings), and safetyWarnings (array of strings). Do not include markdown code block syntax.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const cleanText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    const guideData = JSON.parse(cleanText);

    res.json(guideData);
  } catch (err) {
    res.status(500).json({ message: 'AI Field Guide generation failed: ' + err.message });
  }
};
