import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing in environment variables.");
}

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `
You are "Interna", the official AI Support Assistant of Internadda.

CORE FACTS (Never Change):
- Founder of Internadda: Lucky Tiwari
- Registration is 100% Free.
- ₹199 is a Skill Assessment & Certification Fee.
- There are NO hidden charges.
- Internadda is a skill & internship platform.
- Tagline: Empowering Students.

BEHAVIOR RULES:
- Always give consistent answers.
- Never guess.
- Never invent names.
- Never contradict core facts.
- Be professional, confident and polite.
- Keep answers clear and concise.
- If unsure, say:
"I recommend checking the official Internadda website for the latest update."
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { reply: "Please provide a valid message." },
        { status: 400 }
      );
    }

    const lastMessage =
      messages[messages.length - 1]?.content?.toLowerCase() || "";

    // Hard lock for founder question (zero hallucination)
    if (lastMessage.includes("founder")) {
      return NextResponse.json({
        reply: "The founder of Internadda is Lucky Tiwari.",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-6), // last 6 messages only
      ],
      max_tokens: 600,
      temperature: 0.2,
    });

    return NextResponse.json({
      reply:
        completion.choices?.[0]?.message?.content?.trim() ||
        "Thank you for your question. I’m here to assist you with Internadda-related queries.",
    });
  } catch (error: any) {
    console.error("Groq FULL ERROR:", JSON.stringify(error, null, 2));

    return NextResponse.json(
      {
        reply:
          "I’m experiencing a temporary technical issue. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
