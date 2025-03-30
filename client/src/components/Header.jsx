import React from "react";
import { LogoWithDropdownComponent } from "./LogoWithDropdownComponent";
import { AvatarMenu } from "./AvatarMenu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const Header = ({ isExpanded, setIsExpanded }) => {
  return (
    <header className="bg-white shadow-sm p-2 flex items-center justify-between">
      <Button
        variant="default"
        size="icon"
        className={`text-white bg-gray-700 ${isExpanded && "hidden"}`}
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft className={`h-5 w-5 text-white`} />
        ) : (
          <ChevronRight className="h-5 w-5 text-white" />
        )}
      </Button>
      <h1 className="text-2xl font-bold text-white">
        <LogoWithDropdownComponent width={150} height={50} />
      </h1>
      <AvatarMenu />
    </header>
  );
};

export default Header;
