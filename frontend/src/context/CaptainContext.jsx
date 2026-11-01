import { createContext, useContext, useEffect, useState } from "react";

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCaptain = localStorage.getItem("captain");

    if (savedCaptain) {
      try {
        setCaptain(JSON.parse(savedCaptain));
      } catch (error) {
        console.error("Failed to parse saved captain:", error);
        localStorage.removeItem("captain");
      }
    }

    setIsLoading(false);
  }, []);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);

    if (captainData) {
      localStorage.setItem("captain", JSON.stringify(captainData));
    } else {
      localStorage.removeItem("captain");
    }
  };

  const logoutCaptain = () => {
    setCaptain(null);
    localStorage.removeItem("captain");
  };

  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        setCaptain: updateCaptain,
        isLoading,
        logoutCaptain,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export const useCaptain = () => useContext(CaptainDataContext);

export default CaptainContext;
