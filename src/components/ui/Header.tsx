import React from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Header = () => {
  return (
    <header className="w-full p-2 mb-5">
      <div className="flex items-center justify-between max-w-[88rem] mx-auto px-0">
        <h1 className="text-2xl font-bold">Ravian.ai</h1>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
