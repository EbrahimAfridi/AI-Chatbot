export default function Home() {
<<<<<<< HEAD
=======
  const [messages, setMessages] = useState<
    { role: "user" | "model"; text: string }[]
  >([]);
  const [userPrompts, setUserPrompts] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setMessages([
      {
        role: "user",
        text: "Hello, This is XYZ AI chat bot. If you have any questions, you can ask it.",
      },
    ]);
  }, []);

  // async function run(prompt: string) {
  //   setLoading(true);

  //   const genAI = new GoogleGenerativeAI(apiKey);
  //   const model = genAI.getGenerativeModel({
  //     model: MODEL_NAME,
  //   });

  //   const generationConfig = {
  //     temperature: 1,
  //     topP: 0.95,
  //     topK: 64,
  //     maxOutputTokens: 8192,
  //     responseMimeType: "text/plain",
  //   };

  //   const safetySettings = [
  //     {
  //       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //     },
  //     {
  //       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //     },
  //     {
  //       category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //     },
  //     {
  //       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  //       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  //     },
  //   ];

  //   const chatSession = model.startChat({
  //     generationConfig,
  //     safetySettings,
  //     history: messages.map((msg) => ({
  //       role: msg.role,
  //       parts: [{ text: msg.text }],
  //     })),
  //   });

  //   try {
  //     const result = await chatSession.sendMessage(userPrompts);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { role: "user", text: userPrompts },
  //       { role: "model", text: result.response.text() },
  //     ]);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false); 
  //   }
  // }

  // const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (userPrompts.trim() === "") return;
  //   await run(userPrompts);
  //   setUserPrompts("");
  // };
  //     setLoading(false);
  //   }
  // }

  // NEW
  const throttledRun = throttle(async (prompt: string) => {
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
  }, 60000);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userPrompts.trim() === "") return;
    // await run(userPrompts);
    await throttledRun(userPrompts);
    setUserPrompts("");
  };

>>>>>>> origin/main
  return (
    <>
      <div className="w-[100%] h-[90vh] flex flex-col justify-center items-center font-sans">
        <h3 className="md:text-[1.2vw] sm:text-[2vw] text-[3vw] font-normal font-space text-center leading-[1.5] tracking-wide md:px-[25vw] sm:px-[10vw] px-[2vw] text-slate-300">
          Clear all your medical doubts
        </h3>
        <h1 className="md:text-[6vw] sm:text-[8vw] text-[9vw] font-space font-bold leading-[1] tracking-widest">
          Examine the
        </h1>
        <h1 className="md:text-[6vw] sm:text-[8vw] text-[9vw] font-space font-bold leading-[1] tracking-widest">
          Potential of Vital&apos;s
        </h1>
        <h1 className="md:text-[6vw] sm:text-[8vw] text-[9vw] font-space font-bold leading-[1] tracking-widest gradient-text">
          AI Chatbot
        </h1>
        <p className="md:text-[1.2vw] sm:text-[2vw] text-[3vw] font-normal font-space text-center leading-[1.5] tracking-wide mb-[50px] mt-[50px] md:px-[25vw] sm:px-[10vw] px-[2vw] text-slate-300">
          At Vital, we believe in the power of artificial intelligence to
          transform healthcare. Our platform offers a suite of advanced AI tools
          designed to revolutionize how you screen and address your medical
          concerns.
        </p>
        <div className="flex items-center gap-10">
          <a
            href={`/chatbot`}
            className="bg-custom-gradient font-semibold font-space text-black px-4 py-3 rounded-lg sm:text-xl text-md shadow-md"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
