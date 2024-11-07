import React, {useState, useEffect, ChangeEvent} from "react";
import { FaUserCircle, FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import styles from '../Styles/ChangePassword.module.css';
import { useNavigate } from "react-router-dom";
import { changePasswordUser } from "../ConnectionToBackend/Routes/changePasswordUser";

function ChangePassword() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    //Activamos la navegacion
    const navigate = useNavigate();

    //Función encargada de controlar el struct esperado para recibir datos de entrada del usuario
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmPassChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

    //Función encargada de manejar visualmente el cómo funciona el botón de toggle password
    const togglePasswordVissibility = () => {
        setShowPassword(!showPassword);
    }
    const toggleConfirmPasswordVissibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const validateEmail = (email: String) => {
        // Usando expresiones regulares
        const emailPattern = /^[\w._%+-]+@estudiantec\.cr$/;
        return emailPattern.test(String(email).toLowerCase());
    }

    const validateAndSubmit = async() => {
        if (!email.trim() || !password.trim() || !confirmPassword?.trim()){
            alert('Campos obligatorios, por favor rellenar los campos para iniciar sesión');
            return;
        }

        //Validación de correo electrónico que sea compatible
        /*
        if (!validateEmail(email)){
            alert('Debe ingresar un correo institucional de estudiantec');
            return;
        }*/

        //Validación de password igual
        if (password !== confirmPassword){
            alert('Las contraseñas deben de ser iguales');
            return;
        }
        
        //Una vez ya validado, iniciamos con el sistema
        try {
            await changePasswordUser(email, password, confirmPassword);
            alert("El usuario ha modificado su contraseña");
            navigate("/login");
        } catch (error){
            alert('Inicio de sesión fallido, intenta de nuevo');
        }
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
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className={styles.Input}>
                        <FaUserLock className={styles.icon}/>
                        <input
                            className="Input-Data"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            name="password"
                            onChange={handlePasswordChange}
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
                            onChange={handleConfirmPassChange}
                        />
                        { showConfirmPassword ? (
                            <FaEyeSlash className={`${styles.icon} ${styles.clickable}`} onClick={toggleConfirmPasswordVissibility}/>
                        ) : (
                            <FaEye className={`${styles.icon} ${styles.clickable}`} onClick={toggleConfirmPasswordVissibility}/>
                        )}
                    </div>
                    
                    <button className={`${styles.ChangePassBtn} ${styles.clickable}`} onClick={validateAndSubmit}>Cambiar Contraseña</button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;