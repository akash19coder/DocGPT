import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoAvatarComponent } from "./LogoAvatarComponent";

export function NavbarComponent() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };
  return (
    <header className="flex h-20 w-full items-center justify-between bg-gray-900 px-6">
      <div className="flex items-center space-x-4">
        <Link className="flex items-center space-x-2" href="/">
          <LogoAvatarComponent />
          <span className="text-2xl font-bold text-white">DocGPT</span>
        </Link>
      </div>
      <nav className="flex items-center space-x-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white">
              All Pages
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Page 1</DropdownMenuItem>
            <DropdownMenuItem>Page 2</DropdownMenuItem>
            <DropdownMenuItem>Page 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link className="text-sm font-medium text-white" href="#">
          Features
        </Link>
        <Link className="text-sm font-medium text-white" href="#">
          Pricing
        </Link>
        <Link className="text-sm font-medium text-white" href="#">
          Contact Us
        </Link>
      </nav>
      <Button
        onClick={handleSignIn}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Sign In
      </Button>
    </header>
  );
}
