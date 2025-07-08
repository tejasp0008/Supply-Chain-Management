import React from "react";
import { ShoppingCart } from "lucide-react";

const Header: React.FC = () => (
  <header className="bg-[#0064e1] text-white shadow">
    <div className="flex items-center px-8 py-3 space-x-4">
      <span className="flex items-center text-3xl font-bold">
        <ShoppingCart className="h-8 w-8 mr-2" />
        <span className="hidden sm:inline">Mart Supply Pulse</span>
      </span>
    </div>
  </header>
);

export default Header;
