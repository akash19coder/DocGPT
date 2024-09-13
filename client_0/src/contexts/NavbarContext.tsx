// NavbarContext.js
import { createContext, useContext, useState } from 'react';

type Navbar = {
  showNavbar: boolean;
  toggleNavbar: () => void;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarContext = createContext<Navbar | null>(null);

export const NavbarProvider = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleNavbar = () => {
    setShowNavbar((prevShowNavbar) => !prevShowNavbar);
  };

  const contextValue: Navbar = {
    showNavbar,
    toggleNavbar,
    setShowNavbar,
  };

  return (
    <NavbarContext.Provider value={contextValue}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }

  return context;
};
