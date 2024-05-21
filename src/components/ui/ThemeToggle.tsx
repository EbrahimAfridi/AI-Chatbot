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
      variant={'default'}
      size="lg"
      onClick={toggleTheme}
      aria-label="Toggle italic"
    >
      {theme === "light" ? (
        <Moon/>
      ) : (
        <SunIcon />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
