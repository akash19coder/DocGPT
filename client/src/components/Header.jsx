import React from "react";
import { LogoWithDropdownComponent } from "./LogoWithDropdownComponent";
import { AvatarMenu } from "./AvatarMenu";

const Header = () => {
  return (
    <header className="bg-white shadow-sm p-2 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">
        <LogoWithDropdownComponent width={150} height={50} />
      </h1>
      <AvatarMenu />
    </header>
  );
};

export default Header;
