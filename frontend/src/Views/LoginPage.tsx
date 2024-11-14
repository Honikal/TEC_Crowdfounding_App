import React, { useState, ChangeEvent } from "react";
import { FaUserCircle, FaUserLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from '../Styles/LoginPage.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Components/AuthContext';
import { loginUser } from "../ConnectionToBackend/Routes/loginUser";

//Por cada uso de datos tipo object se ocupa un posible Interface
interface User {
  email: string,
  password: string
};

function LoginPage() {
  const { isAuthenticated, login, logout } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Activamos la navegacion
  const navigate = useNavigate();

  // Función encargada de controlar el struct esperado para recibir datos de entrada del usuario
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  // Función encargada de manejar visualmente el cómo funciona el botón de toggle password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const validateEmail = (email: String) => {
    // Usando expresiones regulares
    const emailPattern = /^[\w._%+-]+@estudiantec\.cr$/;
    return emailPattern.test(String(email).toLowerCase());
  }

  // Función principal, encargada primero de validar los datos y luego llamar al backend
  const validateAndSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Campos obligatorios, por favor rellenar los campos para iniciar sesión');
      return;
    }

    // Validación de correo electrónico que sea compatible
    /*
    if (!validateEmail(email)){
        alert('Debe ingresar un correo institucional de estudiantec');
        return;
    }
    */
    
    // Una vez ya validado, iniciamos con el sistema
    try {
      // Pasa el navigate a la función loginUser
      const userData = await loginUser(email, password, navigate);  // Corregido: pasamos navigate aquí
      login();
      navigate("/main-page", { state: { user: userData } });
    } catch (error) {
      alert('Inicio de sesión fallido, intenta de nuevo');
    }
  }

  return (
    <div className={styles.LoginPage}>
      <div className={styles.ContentLeft}>

      </div>
      <div className={styles.ContentRight}>
        <div className={styles.Form}>
          <h1>Es bueno verte de nuevo</h1>
          <div className={styles.Input}>
            <FaUserCircle className={styles.icon} />
            <input
              className="Input-Data"
              type="email"
              placeholder="Usuario o correo"
              name="email"
              onChange={handleEmailChange}
            />
          </div>
          <div className={styles.Input}>
            <FaUserLock className={styles.icon} />
            <input
              className="Input-Data"
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              name="password"
              onChange={handlePasswordChange}
            />
            {showPassword ? (
              <FaEyeSlash className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVisibility} />
            ) : (
              <FaEye className={`${styles.icon} ${styles.clickable}`} onClick={togglePasswordVisibility} />
            )}
          </div>

          <button className={`${styles.LoginBtn} ${styles.clickable}`} onClick={validateAndSubmit}>Login</button>
          <Link to={'/change-password'}>
            <a>¿Olvidaste la contraseña?</a>
          </Link>
          <Link to={'/signup'}>
            <a>Regístrate ahora</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
