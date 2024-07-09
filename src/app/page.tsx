export default function Home() {
  return (
    <>
      <div className="w-[100%] h-[90vh] flex flex-col justify-center items-center font-sans">
        <h3 className="md:text-[1.2vw] sm:text-[2vw] text-[3vw] font-normal font-space text-center leading-[1.5] tracking-tight md:px-[25vw] sm:px-[10vw] px-[2vw] text-slate-300">
          Welcome to XYZ AI
        </h3>
        <h1 className="md:text-[6vw] mt-6 sm:text-[8vw] text-[9vw] font-space font-bold leading-[1] tracking-tight">
          Unlock the Full
        </h1>
        <h1 className="md:text-[6vw] sm:text-[8vw] text-[9vw] font-space font-bold leading-[1] tracking-tight">
          Potential of
        </h1>
        <h1 className="md:text-[6vw] sm:text-[8vw] text-[9vw] font-space font-bold leading-[1] tracking-tight gradient-text">
          AI Chatbot
        </h1>
        <p className="md:text-[1.2vw] sm:text-[2vw] text-[3vw] font-normal font-space text-center leading-[1.5] tracking-wide mb-[50px] mt-[50px] md:px-[25vw] sm:px-[10vw] px-[2vw] text-slate-300">
          I&apos;m a AI chatbot, let&apos;s have a chat! Click the button below to get started. <br />
          XYZ AI is a chatbot that can help you with your queries and provide you with the information you need.
        </p>
        <div className="flex items-center gap-10">
          <a
            href={`/chatbot`}
            className="bg-custom-gradient font-semibold font-space text-black px-4 py-3 rounded-lg sm:text-xl text-md shadow-md hover:opacity-90"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
