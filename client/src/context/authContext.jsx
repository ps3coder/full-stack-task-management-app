import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateUser = (data) => {
        setCurrentUser(data);
    };

    const clearUser = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, updateUser, clearUser }}>
            {children}
        </AuthContext.Provider>
    );
};
