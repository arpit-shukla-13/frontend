import React, { createContext, useState } from 'react';

export const UniversityContext = createContext();

export const UniversityProvider = ({ children }) => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  return (
    <UniversityContext.Provider value={{ selectedUniversity, setSelectedUniversity }}>
      {children}
    </UniversityContext.Provider>
  );
};
