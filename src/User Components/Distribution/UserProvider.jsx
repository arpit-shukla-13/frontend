// UserProvider.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = (userData) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
