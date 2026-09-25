import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Assistant Endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, context, actionType } = req.body;
    const userMessage = messages?.[messages.length - 1]?.content || '';

    // Prepare system instructions with routine context
    const systemPrompt = `You are "MyRoutine AI", an empathetic, hyper-practical daily routine specialist for Sai.
Sai is a dedicated creator and worker who balances a part-time job, video editing practice, exercise, and healthy habits.

CURRENT USER SCHEDULE CONTEXT:
${JSON.stringify(context?.tasks || [], null, 2)}

TODAY'S HABITS:
${JSON.stringify(context?.habits || [], null, 2)}

CURRENT TIME CONTEXT: ${new Date().toLocaleTimeString()}

Capabilities & Rules:
1. Provide actionable, concise, motivating advice. Keep responses friendly, warm, and structured (under 160 words).
2. If the user asks to "Fix my day" (e.g. woke up late or ran overtime), diagnose the delay, compress buffer/break times or shift learning/editing blocks without compromising work hours or sleep, and propose concrete adjustments.
3. If the user asks to "Plan my tomorrow" or "Add a new task", give a concrete breakdown with start/end times and suggested categories (Personal, Work, Video Editing, Exercise, Learning, Health).
4. If appropriate, return a JSON block or concrete schedule recommendation that the app can highlight.
5. Use emojis tastefully (☀️, 🎬, 🏃, 💼, 🌙).`;

    if (!aiClient) {
      // Fallback response if GEMINI_API_KEY is not yet populated
      let fallbackText = "Hey Sai! I noticed you want to adjust your schedule. Small steps lead to big results! Let's keep your 2:00 PM work commitment steady while protecting your video editing practice tonight.";
      if (userMessage.toLowerCase().includes('fix my day') || actionType === 'fix_day') {
        fallbackText = "I see what happened! Let's compress your morning buffer time and shift your personal study block. You will still hit your 2:00 PM work on time, and have plenty of focus for Video Editing at 10:00 PM! Would you like me to update your schedule?";
      } else if (userMessage.toLowerCase().includes('tomorrow') || actionType === 'plan_tomorrow') {
        fallbackText = "Here is a high-energy plan for tomorrow: Start with a brisk 30m walk at 9:30 AM, lock in lunch by 12:30 PM, conquer work from 2:00 PM - 10:00 PM, and dive into your YouTube video cuts from 10:00 PM to midnight!";
      }
      return res.json({ reply: fallbackText });
    }

    // Call Gemini 3.8 Flash model
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage || 'Hello',
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm here to help optimize your day!";
    return res.json({ reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Failed to generate AI response',
      message: error?.message || 'Unknown error',
    });
  }
});

// Vite middleware setup for full-stack dev
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
