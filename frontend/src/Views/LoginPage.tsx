import React, {useState, useEffect, ChangeEvent} from "react";
import { FaUserCircle, FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import '../Styles/LoginPage.css';
import { Link } from "react-router-dom";

//Por cada uso de datos tipo object se ocupa un posible Interface
interface User{
    email: string,
    password: string
};

function LoginPage() {
    const [usuario, setUsuario] = useState<User>({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    //Función encargada de controlar el struct esperado para recibir datos de entrada del usuario
    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsuario(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    //Función encargada de manejar visualmente el cómo funciona el botón de toggle password
    const togglePasswordVissibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="LoginPage">
            <div className="Content-Left">

            </div>
            <div className="Content-Right">
                <div className="Form">
                    <h1>Es bueno verte de nuevo</h1>
                    <div className="Input">
                        <FaUserCircle className="icon"/>
                        <input
                            className="Input-Data"
                            type="email"
                            placeholder="Usuario o correo"
                            name="email"
                            onChange={handleUserChange}
                        />
                    </div>
                    <div className="Input">
                        <FaUserLock className="icon"/>
                        <input
                            className="Input-Data"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            name="password"
                            onChange={handleUserChange}
                        />
                        { showPassword ? (
                            <FaEyeSlash className="icon clickable" onClick={togglePasswordVissibility}/>
                        ) : (
                            <FaEye className="icon clickable" onClick={togglePasswordVissibility}/>
                        )}
                    </div>
                    
                    <button className="Login-btn clickable">Login</button>
                    <a>¿Olvidaste la contraseña?</a>
                    <Link to={'/signup'}>
                        <a>Regístrate ahora</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;