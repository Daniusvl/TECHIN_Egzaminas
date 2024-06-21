import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({children}) => {

    const [cookies, setCookies, removeCookies] = useCookies();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = cookies.token;
        if (token) {
            const payload = jwtDecode(token);
            const user = payload.user;
            setUser(user);
            setIsAuthenticated(true);
        }
        else {
            setUser(null);
            setIsAuthenticated(false);
        }

        setIsLoading(false);
    }, [cookies.token]);

    const authenticate = useCallback((token) => {
        setIsLoading(true);

        const payload = jwtDecode(token);
        const user = payload.user;

        setCookies("token", token, {
            expires: new Date(payload.exp * 1000),
        });

        setIsAuthenticated(true);
        setUser(user);

        setIsLoading(false);
    }, [setCookies]);

    const logout = useCallback(() => {
        setIsLoading(true);

        removeCookies("token");
        setUser(null);
        setIsAuthenticated(false);

        setIsLoading(false);
    }, [removeCookies]);

    return (
        <authContext.Provider value={{
            user,
            isAuthenticated,
            authenticate,
            logout,
        }}>
            {!isLoading && children}
        </authContext.Provider>
    );
};