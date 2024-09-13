import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { authenticateUser, loginUser, signUpUser } from "../helpers/api-communicator"
type User = {
    name: string,
    email: string,
}
type AuthUser = {
    isLoggedIn: boolean,
    user: User,
    login: (email: string, password: string) => Promise<void>,
    signup: (name: string, email: string, password: string) => Promise<void>,
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthUser | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        async function checkAuthentication() {
            const data = await authenticateUser();
            if (data) {
                setUser({ name: data.name, email: data.email });
                setIsLoggedIn(true);
            }
        }
        checkAuthentication();
    },[]);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ name: data.name, email: data.email });
            setIsLoggedIn(true);
        }
        return data;
    }

    const signup = async (name: string, email: string, password: string) => {
        console.log(name,email,password);
        const data = await signUpUser(name, email, password);

        console.log(data);
        
        if (data) {
            setUser({ name: data.name, email: data.email });
            setIsLoggedIn(true);
        }
        return data;
    }
    const logout = () => { }

    const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

