import React, {useState, useEffect, ChangeEvent} from "react";
import { FaUserCircle, FaIdCard, FaPhoneSquareAlt, FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineEmail, MdOutlineWork } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';
import { BiSolidInfoCircle } from 'react-icons/bi';

import styles from '../Styles/SignUpPage.module.css';

//Por cada uso de datos tipo object se ocupa un posible Interface
interface User{
    name: string,
    id: string,
    email: string,
    work_area: string,
    telephone: string,
    budget: Number,
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
        budget: 0.00,
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<String>("");
    const [errorMessages, setErrorMessages] = useState<{[key: string]: string}>({});

    //Función encargada de controlar el struct esperado para recibir datos de entrada del usuario
    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsuario(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        //Hacemos función para validación dinámica
        validateInput(e.target.name, e.target.value);
    }

    //Función encargada de manejar visualmente el cómo funciona el botón de toggle password
    const togglePasswordVissibility = () => setShowPassword(!showPassword);

    //Validaciones de datos iniciales
    const validateInput = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "id":
                if(!/^[1-9]{1}-\d{4}-\d{4}$/.test(value)){
                    error = "Por favor digitar la cédula de identificación (ej. 1-XXXX-XXXX)"
                }
                break;
            case "email":
                if (!/^[\w._%+-]+@estudiantec\.cr$/.test(value)){
                    error = "Por favor usar un correo institucional de TEC (@estudiantec.cr)"
                }
                break;
            case "telephone":
                if (!/^[4,5,6,7,8][0-9]{3}-[0-9]{4}$/.test(value)){
                    error = "Formato de teléfono incorrecto (ej. 8XXX-XXXX)";
                }
                break;
            case "budget":
                if (parseFloat(value) < 0){
                    error = "El número debe ser un valor entero";
                }
                break;
            case "password":
                setPasswordStrength(getPasswordStrength(value));
                break;
            case "confirmPassword":
                if (value !== usuario.password) {
                    error = "Las contraseñas no coinciden";
                }
                break;
            default:
                break;
        }

        setErrorMessages(prevErrors => ({ ...prevErrors, [name]: error }));
    }

    //Función para tomar la fuerza de la contraseña
    const getPasswordStrength = (password : string) => {
        if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)){
            return "Fuerte";
        } else if (password.length >= 6) {
            return "Medio";
        } else {
            return "Débil";
        }
    }

    //Función encargada de hacer la validación del programa
    const validateUserData = () => {
        const requiredFields = ["name", "id", "email", "telephone", "password", "confirmPassword"];
        let formIsValid = true;

        //Ahora hacemos la validación de forma normal
        requiredFields.forEach(field => {
            if (!usuario[field as keyof User]) {
                setErrorMessages(prevErrors => ({
                    ...prevErrors,
                    [field]: "Éste campo es obligatorio"
                }));
                formIsValid = false;
            }
        })

        if (formIsValid) {
            alert("Mockup de registro realizado exitosamente"); 
        } else {
            alert("No se puede registrar, corrija los errores");
        }
    }

    return (
        <div className={styles.SignUpPage}>
            <div className={styles.ContentLeft}></div>
            <div className={styles.ContentRight}>
                <div className={styles.Form}>
                    <h1>Crear cuenta</h1>

                    <div className={styles.SectionForm}>
                        {/*Sección nombre de usuario e ID*/}
                        <div className={styles.InputController}>
                            <div className={styles.Input}>
                                <FaUserCircle className={styles.icon}/>
                                <input
                                    className="InputData"
                                    type="text"
                                    placeholder="Nombre completo"
                                    name='name'
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className={styles.ErrorSection}>
                                { errorMessages.name && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                                <small className={styles.ErrorText}>{errorMessages.name}</small>
                            </div>
                        </div>
                        <div className={styles.InputController}>
                            <div className={styles.Input}>
                                <FaIdCard className={styles.icon}/>
                                <input
                                    className="InputData"
                                    type="text"
                                    placeholder="N° de identificación"
                                    name='id'
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className={styles.ErrorSection}>
                            { errorMessages.id && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                                <small className={styles.ErrorText}>{errorMessages.id}</small>
                            </div>
                        </div>
                    </div>
                        
                    <div className={styles.SectionForm}>
                        {/*Sección Email y Área de trabajo*/}
                        <div className={styles.InputController}>
                            <div className={styles.Input}>
                                <MdOutlineEmail className={styles.icon}/>
                                <input
                                    className="InputData"
                                    type="email"
                                    placeholder="Correo electrónico"
                                    name='email'
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className={styles.ErrorSection}>
                                { errorMessages.email && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                                <small className={styles.ErrorText}>{errorMessages.email}</small>
                            </div>
                        </div>
                        
                        <div className={styles.InputController}>
                            <div className={styles.Input}>
                                <MdOutlineWork className={styles.icon}/>
                                <input
                                    className="InputData"
                                    type="text"
                                    placeholder="Área de trabajo"
                                    name='work_area'
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className={styles.ErrorSection}>
                                { errorMessages.work_area && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                                <small className={styles.ErrorText}>{errorMessages.work_area}</small>
                            </div>
                        </div>
                    </div>

                    <div className={styles.SectionForm}>
                        {/*Sección Teléfono y fondos iniciales*/}
                        <div className={styles.InputController}>
                            <div className={styles.Input}>
                                <FaPhoneSquareAlt className={styles.icon}/>
                                <input
                                    className="InputData"
                                    type="tel"
                                    placeholder="Teléfono"
                                    name='telephone'
                                    onChange={handleUserChange}
                                />
                            </div>
                            <div className={styles.ErrorSection}>
                                { errorMessages.telephone && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                                <small className={styles.ErrorText}>{errorMessages.telephone}</small>
                            </div>
                        </div>
                        <div className={styles.InputController}>
                            <div className={styles.Input}>
                                <GiReceiveMoney className={styles.icon}/>
                                <input
                                    className="InputData"
                                    type="number"
                                    placeholder="Presupuesto inicial"
                                    name='budget'
                                    onChange={handleUserChange}
                                    min={0}
                                />
                                
                            </div>
                            <div className={styles.ErrorSection}>
                                { errorMessages.budget && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                                <small className={styles.ErrorText}>{errorMessages.budget}</small>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.SectionForm}>
                        {/*Sección Contraseña y Contraseñas*/}
                        <div className={styles.InputController}>
                            <div className={styles.Input}>
                                <FaUserLock className={styles.icon}/>
                                <input
                                    className="InputData"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Contraseña"
                                    name='password'
                                    onChange={handleUserChange}
                                />
                                { showPassword ? (
                                    <FaEyeSlash className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVissibility}/>
                                ) : (
                                    <FaEye className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVissibility}/>
                                )}
                            </div>
                            <div className={styles.ErrorSection}>
                                <span className={styles.ErrorText}>{passwordStrength}</span>
                                { errorMessages.password && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                                <small className={styles.ErrorText}>{errorMessages.password}</small>
                            </div>
                        </div>

                        <div className={styles.InputController}>
                            <div className={styles.Input}>
                                <FaUserLock className={styles.icon}/>
                                <input
                                    className="InputData"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirmar contraseña"
                                    name='confirmPassword'
                                    onChange={handleUserChange}
                                />
                                { showPassword ? (
                                    <FaEyeSlash className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVissibility}/>
                                ) : (
                                    <FaEye className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVissibility}/>
                                )}
                            </div>
                            <div className={styles.ErrorSection}>
                            { errorMessages.confirmPassword && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                                <small className={styles.ErrorText}>{errorMessages.confirmPassword}</small>
                            </div>
                        </div>
                    </div>
                    
                    <button className={styles.SignupBtn} onClick={validateUserData}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;