import React, { ChangeEvent, FormEvent } from "react";
import { Button } from "./button";
import { Send } from "lucide-react";
import { Input } from "./input";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  userPrompts: string;
  setUserPrompts: (value: string) => void;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  userPrompts,
  setUserPrompts,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPrompts(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="mt-4 w-full max-w-lg">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter your prompt here"
          name="prompt"
          value={userPrompts}
          onChange={handleChange}
          className="flex-grow w-[85%]"
        />
        <Button type="submit" className="w-[15%] gap-1 flex justify-center">
          <Send className="h-3.5 w-3.5" />
          <span className="text-white">Send</span>
        </Button>
      </div>
    </form>
  );
};

export default Form;
