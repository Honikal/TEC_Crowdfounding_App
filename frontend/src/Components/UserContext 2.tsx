import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
    idUsuario: string,
    nombre: string,
    correo: string, 
    password: string,
    categorias: string[],
    presupuesto: number, 
    areaTrabajo: string,
    activa: boolean, 
    role: string,
    telefono: string,
    cedula: string
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

//Componente de provider de usuario
interface UserProvideProps {
    children: ReactNode; //Pasamos que básicamente espere un tipo children en la entrada
}

export const UserProvider: React.FC<UserProvideProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    /*Éste es el código al cual vamos a usar por fuera, para determinar el acceso a datos o 
    si está authenticado o no*/
    const context = useContext(UserContext);
    if (context === undefined){
        throw new Error("Error de código, useAuth debe usarse junto a UserProvider");   
    }
    //console.log("Si se usa el useUser");
    return context;
}


