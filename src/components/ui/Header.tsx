import React from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Linkedin, Twitter } from "lucide-react";
import "../../styles/header.css";

const Header = () => {
  return (
    <header className="w-full p-2 mb-2 md:mb-5 pt-2">
      <div className="flex items-center justify-between max-w-[88rem] mx-auto">
        <a href="https://ravian.ai/" target="_blank">
          <h1 className="text-sm md:text-2xl font-bold heading-link">
            RAVIAN AI
          </h1>
        </a>
        <div className="flex items-center justify-start gap-4 mr-6">
          <ThemeToggle />
          <a
            href="https://x.com/EbrahimAfridi3"
            target="blank"
            rel="noopener noreferrer"
            className="heading-link"
          >
            <Twitter size={23} />
          </a>
          <a
            href="https://www.linkedin.com/in/ebrahim-afridi-83188b219/"
            target="blank"
            rel="noopener noreferrer"
            className="heading-link"
          >
            <Linkedin size={23} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
