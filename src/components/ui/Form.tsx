import React, { ChangeEvent, FormEvent } from "react";
import { Button } from "./button";
import { Send } from "lucide-react";
import { Input } from "./input";
import { ReloadIcon } from "@radix-ui/react-icons";

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  userPrompts: string;
  setUserPrompts: (value: string) => void;
  loading: boolean;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  userPrompts,
  setUserPrompts,
  loading,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPrompts(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-3xl">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter your prompt here"
          name="prompt"
          value={userPrompts}
          onChange={handleChange}
          className="flex-grow w-[85%] p-4"
          disabled={loading}
        />
        {loading === false ? (
          <Button
            type="submit"
            className="w-[15%] gap-1 flex justify-center"
            // disabled={loading}
          >
            <Send className="h-0 md:h-3.5 w-0 md:w-3.5" />
            <span className="text-xs md:text-sm">Send</span>
          </Button>
        ) : (
          <Button disabled>
            <ReloadIcon className="mr-2 h-3 w-3 md:h-4 md:w-4 animate-spin" />
            <span className="text-xs md-text-sm">Please wait</span>
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
