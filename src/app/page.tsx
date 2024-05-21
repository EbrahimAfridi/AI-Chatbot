"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Form from "@/components/ui/Form";

const MODEL_NAME = "gemini-1.5-flash-latest";
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([]);
  const [userPrompts, setUserPrompts] = useState<string>("");
  useEffect(() => {
    setMessages([
      {
        role: 'user',
        text: "Hi, You can chat with the AI bot here.",
        // sender: "bot",
      },
    ]);
  }, []);

  async function run(prompt: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chatSession.sendMessage(userPrompts);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: userPrompts },
      { role: "model", text: result.response.text() },
    ]);
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userPrompts.trim() === "") return;
    await run(userPrompts);
    setUserPrompts("");
  };
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg shadow-none border-none">
          <CardHeader className="flex flex-col items-center text-center">
            <CardTitle>Chat with AI</CardTitle>
            <CardDescription>You can enter your prompts below.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 h-96 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-full max-w-[75%] gap-2 px-3 py-2 rounded-lg text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <Avatar className="size-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {message.text}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Form
              onSubmit={onSubmit}
              userPrompts={userPrompts}
              setUserPrompts={setUserPrompts}
            />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
