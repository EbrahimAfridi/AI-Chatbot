"use client";
import { Send } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useEffect, useState } from "react";
import Header from "@/components/ui/Header";

const MODEL_NAME = "gemini-1.5-flash-latest";
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([]);
  const [userPrompts, setUserPrompts] = useState<string>("");
  useEffect(() => {
    setMessages([
      {
        role: 'user',
        text: "Hello, I am an Ravian AI chat bot. If you have any questions, you can ask me.",
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
      <Card className="flex flex-col justify-center items-center px-4 shadow-none border-none">
        <CardHeader className="flex justify-center text-center">
          <CardTitle>Chat with AI</CardTitle>
          <CardDescription>You can enter your prompts below.</CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="w-full shadow-none max-w-lg flex flex-col space-y-4 p-4 rounded-lg overflow-auto h-96">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-row gap-2 rounded-lg px-3 py-2 text-sm",
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
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={onSubmit} className="w-full max-w-lg mt-4">
            <div className="flex min-w-[600px] items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter your prompt here"
                name="prompt"
                value={userPrompts}
                onChange={(e) => setUserPrompts(e.target.value)}
                className="flex-grow w-[85%]"
              />
              <Button
                type="submit"
                className="w-[15%] gap-1 flex justify-center"
              >
                <Send className="h-3.5 w-3.5" />
                <span className=" text-white">Send</span>
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
