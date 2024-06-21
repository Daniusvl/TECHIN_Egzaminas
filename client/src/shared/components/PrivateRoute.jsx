import { useEffect } from "react";
import { useAuth } from "../../shared/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children, roles}) => {

    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if(isAuthenticated && !roles.includes(user.role)){
            alert("Access denied")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (isAuthenticated ? (roles.includes(user.role) ? children : <Navigate to="/" />) : <Navigate to="/login" />);
};