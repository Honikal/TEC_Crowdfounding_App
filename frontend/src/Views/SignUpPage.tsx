import React, {useState, useEffect, ChangeEvent} from "react";
import { FaUserCircle, FaIdCard, FaPhoneSquareAlt, FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineEmail, MdOutlineWork } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi'

import '../Styles/SignUpPage.css';

//Por cada uso de datos tipo object se ocupa un posible Interface
interface User{
    name: string,
    id: string,
    email: string,
    work_area: string,
    telephone: string,
    //budget inicial
    password: string,
    confirmPassword: string
};

function SignUpPage() {
    const [usuario, setUsuario] = useState<User>({
        name: "",
        id: "",
        email: "",
        work_area: "",
        telephone: "",
        password: "",
        confirmPassword: ""
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
        <div className="SignUpPage">
            <div className="Content-Left">

            </div>
            <div className="Content-Right">
                <div className="Form">
                    <h1>Crear cuenta</h1>

                    <div className="Section-form">
                        {/*Sección nombre de usuario e ID*/}
                        <div className="Input">
                            <FaUserCircle className="icon"/>
                            <input
                                className="InputData"
                                type="text"
                                placeholder="Nombre completo"
                                name='name'
                                onChange={handleUserChange}
                            />
                        </div>
                        <div className="Input">
                            <FaIdCard className="icon"/>
                            <input
                                className="InputData"
                                type="text"
                                placeholder="ID de usuario"
                                name='id'
                                onChange={handleUserChange}
                            />
                        </div>
                    </div>

                    <div className="Section-form">
                        {/*Sección Email y Área de trabajo*/}
                        <div className="Input">
                            <MdOutlineEmail className="icon"/>
                            <input
                                className="InputData"
                                type="email"
                                placeholder="Correo electrónico"
                                name='email'
                                onChange={handleUserChange}
                            />
                        </div>
                        <div className="Input">
                            <MdOutlineWork className="icon"/>
                            <input
                                className="InputData"
                                type="text"
                                placeholder="Área de trabajo"
                                name='work_area'
                                onChange={handleUserChange}
                            />
                        </div>
                    </div>

                    <div className="Section-form">
                        {/*Sección Teléfono y fondos iniciales*/}
                        <div className="Input">
                            <FaPhoneSquareAlt className="icon"/>
                            <input
                                className="InputData"
                                type="tel"
                                placeholder="Teléfono"
                                name='telephone'
                                onChange={handleUserChange}
                            />
                        </div>
                        <div className="Input">
                            <GiReceiveMoney className="icon"/>
                            <input
                                className="InputData"
                                type="number"
                                placeholder="Presupuesto inicial"
                                //name='work_area'
                                onChange={handleUserChange}
                            />
                        </div>
                    </div>

                    <div className="Section-form">
                        {/*Sección Contraseña y Contraseñas*/}
                        <div className="Input">
                            <FaUserLock className="icon"/>
                            <input
                                className="InputData"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Contraseña"
                                name='password'
                                onChange={handleUserChange}
                            />
                            { showPassword ? (
                                <FaEyeSlash className="icon clickable" onClick={togglePasswordVissibility}/>
                            ) : (
                                <FaEye className="icon clickable" onClick={togglePasswordVissibility}/>
                            )}
                        </div>
                        <div className="Input">
                            <FaUserLock className="icon"/>
                            <input
                                className="InputData"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirmar contraseña"
                                name='confirmPassword'
                                onChange={handleUserChange}
                            />
                            { showPassword ? (
                                <FaEyeSlash className="icon clickable" onClick={togglePasswordVissibility}/>
                            ) : (
                                <FaEye className="icon clickable" onClick={togglePasswordVissibility}/>
                            )}
                        </div>
                    </div>
                    
                    <button className="SignUp-btn">Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;