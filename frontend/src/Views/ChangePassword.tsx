import React, {useState, useEffect, ChangeEvent} from "react";
import { FaUserCircle, FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import styles from '../Styles/ChangePassword.module.css';
import { Link } from "react-router-dom";

//Por cada uso de datos tipo object se ocupa un posible Interface
interface User{
    email: string,
    password: string,
    confirmPassword: string
};

function ChangePassword() {
    const [usuario, setUsuario] = useState<User>({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
        <div className={styles.ChangePasswordPage}>
            <div className={styles.ContentLeft}>

            </div>
            <div className={styles.ContentRight}>
                <div className={styles.Form}>
                    <h1>Cambiar contraseña</h1>
                    <div className={styles.Input}>
                        <FaUserCircle className={styles.icon}/>
                        <input
                            className="Input-Data"
                            type="email"
                            placeholder="Correo electrónico"
                            name="email"
                            onChange={handleUserChange}
                        />
                    </div>
                    <div className={styles.Input}>
                        <FaUserLock className={styles.icon}/>
                        <input
                            className="Input-Data"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            name="password"
                            onChange={handleUserChange}
                        />
                        { showPassword ? (
                            <FaEyeSlash className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVissibility}/>
                        ) : (
                            <FaEye className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVissibility}/>
                        )}
                    </div>

                    <div className={styles.Input}>
                        <FaUserLock className={styles.icon}/>
                        <input
                            className="Input-Data"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirmar contraseña"
                            name="confirmPassword"
                            onChange={handleUserChange}
                        />
                        { showConfirmPassword ? (
                            <FaEyeSlash className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVissibility}/>
                        ) : (
                            <FaEye className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVissibility}/>
                        )}
                    </div>
                    
                    <button className={`${styles.ChangePassBtn} ${styles.clickable}`}>Cambiar Contraseña</button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;