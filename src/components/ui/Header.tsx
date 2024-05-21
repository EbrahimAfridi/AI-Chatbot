import React from 'react'
import ThemeToggle from "@/components/ui/ThemeToggle";

const Header = () => {
  return (
    <header className='mb-10 px-4 py-2'>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ravian.ai</h1>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header
