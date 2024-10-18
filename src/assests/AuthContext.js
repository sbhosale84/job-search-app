import { createContext, useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";


export const AuthContext = createContext("");


export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("loggedInUser")
        if (user) {
            setLoggedInUser(JSON.parse(user))
        }
    }, [])

    const login = (user) => {
        localStorage.setItem("loggedInUser", JSON.stringify(user))
        setLoggedInUser(user)
        navigate('/jobs')
    }

    const logout = () => {
        localStorage.removeItem("loggedInUser")
        setLoggedInUser(null);
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ login, logout, loggedInUser }} >
            {children}
        </AuthContext.Provider>
    )
}
