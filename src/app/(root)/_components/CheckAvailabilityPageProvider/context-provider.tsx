"use client";

import React, { useState } from "react";

interface CheckAvailabilityPageContextType {
  searchButtonLoading: boolean;
  setSearchButtonLoading: Function;
}

export const CheckAvailabilityPageContext =
  React.createContext<CheckAvailabilityPageContextType>({
    searchButtonLoading: false,
    setSearchButtonLoading: () => {},
  });

export const useCheckAvailabilityPageContext = () => {
  return React.useContext(CheckAvailabilityPageContext);
};

const CheckAvailabilityPageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchButtonLoading, setSearchButtonLoading] = useState(false);

  return (
    <CheckAvailabilityPageContext.Provider
      value={{ searchButtonLoading, setSearchButtonLoading }}
    >
      {children}
    </CheckAvailabilityPageContext.Provider>
  );
};

export default CheckAvailabilityPageContextProvider;
