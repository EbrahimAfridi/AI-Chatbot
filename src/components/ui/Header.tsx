import React from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Linkedin, Twitter } from "lucide-react";
import "../../styles/header.css";

const Header = () => {
  return (
    <header className="w-full p-2 mb-5">
      <div className="flex items-center justify-between max-w-[88rem] mx-auto px-0">
        <a href="https://ravian.ai/" target="_blank">
          <h1 className="text-2xl font-bold heading-link">RAVIAN AI</h1>
        </a>
        <div className="flex items-center justify-start gap-4 mr-6">
          <ThemeToggle />
          <a
            href="https://x.com/EbrahimAfridi3"
            target="blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/in/ebrahim-afridi-83188b219/"
            target="blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
