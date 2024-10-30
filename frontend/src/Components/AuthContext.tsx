import React, { createContext, useState, useContext, ReactNode} from "react";

interface AuthContextType {
    isAuthenticated: boolean,
    login: () => void, 
    logout: () => void
}

//Para evitar problemas de tipos, creamos una interfaz que espere cierto tipo de datos
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProvideProps {
    children: ReactNode; //Pasamos que básicamente espere un tipo children en la entrada
}

export const AuthProvider: React.FC<AuthProvideProps> = ( { children } ) => {
    /*Éste código que será usado dentro de Header, es usado para determinar si se muestran ciertos,
    atributos del Header, o si no se cumplen dichos atributos como tal*/

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    /*Éste es el código al cual vamos a usar por fuera, para determinar el acceso a datos o 
    si está authenticado o no*/
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("Error de código, useAuth debe usarse junto a AuthProvider");   
    }
    return context;
}


