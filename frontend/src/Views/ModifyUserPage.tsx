import React, {useState, useEffect, ChangeEvent} from "react";
import { FaUserCircle, FaIdCard, FaPhoneSquareAlt, FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdOutlineEmail, MdOutlineWork } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';
import { BiSolidInfoCircle } from 'react-icons/bi';
import { useNavigate, useLocation } from "react-router-dom";

import styles from '../Styles/ModifyUserPage.module.css';
import { modifyUser } from "../ConnectionToBackend/Routes/modifyUser";

//Por cada uso de datos tipo object se ocupa un posible Interface
interface User{
    idUsuario: string,
    nombre: string,
    areaTrabajo: string,
    telefono: string,
    presupuesto: number,
    categorias: string[]
};

function ModifyUserPage() {
    //Activamos la navegacion
    const location = useLocation();
    const navigate = useNavigate();
    const initialUser = location.state?.user as User; //Recibimos al usuario

    console.log("Usuario recibido en modificar usuario: ", initialUser);

    const [usuario, setUsuario] = useState<User>({
        idUsuario: initialUser.idUsuario || "",
        nombre: initialUser.nombre || "",
        areaTrabajo: initialUser.areaTrabajo || "",
        telefono: initialUser.telefono || "",
        presupuesto: initialUser.presupuesto || 0.00,
        categorias: initialUser.categorias
    });

    const [errorMessages, setErrorMessages] = useState<{[key: string]: string}>({});

    //Función encargada de controlar el struct esperado para recibir datos de entrada del usuario
    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
        //Hacemos función para validación dinámica
        validateInput(name, value);
    }

    //Función onBlur, para determinar o dar feedback al usuario de cómo ingresar los datos
    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateInput(name, value);
    }

    //Validaciones de datos iniciales
    const validateInput = (name: string, value: string) => {
        let error = "";
        switch (name) {
            case "telefono":
                if (!/^[4,5,6,7,8][0-9]{3}-[0-9]{4}$/.test(value)){
                    error = "Formato de teléfono incorrecto (ej. 8XXX-XXXX)";
                }
                break;
            case "presupuesto":
                if (Number.isNaN(value) || parseFloat(value) < 0){
                    error = "El número debe ser un valor entero";
                }
                break;
            default:
                break;
        }

        setErrorMessages(prevErrors => {
            const updatedErrors = { ...prevErrors, [name]: error };
            console.log("Errores actualizados: ", updatedErrors);
            return updatedErrors;
        });
    }

    //Función encargada de hacer la validación del programa
    const validateUserData = async() => {
        //Checamos por errores existentes
        const hasErrors = Object.values(errorMessages).some(message => message !== "");

        if (hasErrors){
            alert("Corrige los errores antes de continuar");
            return;
        }

        const requiredFields = ["telefono"];
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
            //alert("Mockup de registro realizado exitosamente"); 

            //Validamos o parseamos los datos
            const validUserData = {
                ...usuario,
                presupuesto: Number(usuario.presupuesto)
            };

            console.log("Datos modificados: ", validUserData);
            const modifiedUser = await modifyUser(validUserData);
            navigate("/main-page", { state: { user: modifiedUser } });
        } else {
            alert("No se puede registrar, corrija los errores");
        }
    }

    return (
        <div className={styles.SignUpPage}>
            <div className={styles.ContentLeft}></div>
            <div className={styles.ContentRight}>
                <div className={styles.Form}>
                    <h1>Modificar cuenta</h1>

                    <div className={styles.InputController}>
                        <div className={styles.Input}>
                            <FaUserCircle className={styles.icon}/>
                            <input
                                className="InputData"
                                type="text"
                                placeholder="Nombre completo"
                                name='nombre'
                                onChange={handleUserChange}
                                onBlur={handleBlur}
                                value={usuario.nombre}
                            />
                        </div>
                        <div className={styles.ErrorSection}>
                            { errorMessages.nombre && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                            <small className={styles.ErrorText}>{errorMessages.nombre}</small>
                        </div>
                    </div>

                    <div className={styles.InputController}>
                        <div className={styles.Input}>
                            <MdOutlineWork className={styles.icon}/>
                            <input
                                className="InputData"
                                type="text"
                                placeholder="Área de trabajo"
                                name='areaTrabajo'
                                onChange={handleUserChange}
                                onBlur={handleBlur}
                                value={usuario.areaTrabajo}
                            />
                        </div>
                        <div className={styles.ErrorSection}>
                            { errorMessages.areaTrabajo && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                            <small className={styles.ErrorText}>{errorMessages.areaTrabajo}</small>
                        </div>
                    </div>

                    <div className={styles.InputController}>
                        <div className={styles.Input}>
                            <FaPhoneSquareAlt className={styles.icon}/>
                            <input
                                className="InputData"
                                type="tel"
                                placeholder="Teléfono"
                                name='telefono'
                                onChange={handleUserChange}
                                onBlur={handleBlur}
                                value={usuario.telefono}
                            />
                        </div>
                        <div className={styles.ErrorSection}>
                            { errorMessages.telefono && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                            <small className={styles.ErrorText}>{errorMessages.telefono}</small>
                        </div>
                    </div>

                    <div className={styles.InputController}>
                        <div className={styles.Input}>
                            <GiReceiveMoney className={styles.icon}/>
                            <input
                                className="InputData"
                                type="number"
                                placeholder="Presupuesto inicial"
                                name='presupuesto'
                                onChange={handleUserChange}
                                onBlur={handleBlur}
                                min={0}
                                value={usuario.presupuesto.toString()}
                            />
                        </div>
                        <div className={styles.ErrorSection}>
                            { errorMessages.presupuesto && <BiSolidInfoCircle className={styles.ErrorIcon}/>}
                            <small className={styles.ErrorText}>{errorMessages.presupuesto}</small>
                        </div>
                    </div>
                        
                    <button className={styles.ModifyBtn} onClick={validateUserData}>Modificar Usuario</button>
                </div>
            </div>
        </div>
    )
}

export default ModifyUserPage;