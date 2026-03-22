import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", 
});

app.post('/api/summarize', async (req, res) => {
  const text = req.body?.text?.trim();

  if (!text) {
    return res.status(400).json({ error: 'Input text is required.' });
  }

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", 
      messages: [
        {
          role: "system",
          content: `You are an assistant that converts unstructured text into a strict JSON summary. Return only valid JSON with this shape:
{
  "summary": "one sentence",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "sentiment": "positive neutral negative"
}
Rules:
- summary must be exactly one sentence
- keyPoints must contain exactly 3 short bullet-style strings
- sentiment must be one of: positive, neutral, or negative
- do not include markdown or extra keys`
        },
        { role: "user", content: text }
      ],
      response_format: { type: "json_object" }, 
      temperature: 0.1, 
    });

    const result = JSON.parse(response.choices[0].message.content);
    return res.json(result);

  } catch (error) {
    console.error("LLM Error:", error);
    return res.status(500).json({ error: 'Failed to summarize text. Please try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});