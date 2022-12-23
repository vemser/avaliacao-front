import React, { createContext,  useState } from "react";

interface IMenuLateral {
  isOpen: boolean;
  toggleOpen: () => void;
}

interface IChildren {
  children: React.ReactNode;
}

export const MenuLateralContext = createContext({} as IMenuLateral);

export const MenuLateralProvider: React.FC<IChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <MenuLateralContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </MenuLateralContext.Provider>
  );
};