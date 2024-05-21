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
import { marked } from "marked";
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
  const [messages, setMessages] = useState<
    { role: "user" | "model"; text: string }[]
  >([]);
  const [userPrompts, setUserPrompts] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setMessages([
      {
        role: "user",
        text: "Hello, This is Ravian AI chat bot. If you have any questions, you can ask it.",
      },
    ]);
  }, []);

  async function run(prompt: string) {
    setLoading(true);

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

    try {
      const result = await chatSession.sendMessage(userPrompts);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", text: userPrompts },
        { role: "model", text: result.response.text() },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userPrompts.trim() === "") return;
    await run(userPrompts);
    setUserPrompts("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center w-full px-4 py-0">
        <Card className="w-full max-w-3xl shadow-none border-none">
          <CardHeader className="text-center">
            <CardTitle>Chat with AI</CardTitle>
            <CardDescription>You can enter your prompts below.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full flex flex-col space-y-4 rounded-lg overflow-auto h-[65vh]">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex max-w-[75%] gap-2 rounded-lg px-3 py-2 text-sm",
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <Avatar className="size-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: marked(message.text) }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Form
              onSubmit={onSubmit}
              userPrompts={userPrompts}
              setUserPrompts={setUserPrompts}
              loading={loading} 
            />
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

