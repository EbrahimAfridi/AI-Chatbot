import { useTheme } from "@/context/ThemeContext";
import { Toggle } from "@/components/ui/toggle";
import { Moon, SunIcon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Toggle
      variant={"default"}
      size={'sm'}
      className="md:text-2xl font-bold heading-link px-0 md:px-2"
      onClick={toggleTheme}
      aria-label="Toggle italic"
    >
      {theme === "light" ? <Moon /> : <SunIcon />}
    </Toggle>
  );
};

export default ThemeToggle;
