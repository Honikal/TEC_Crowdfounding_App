import app_logo from '../app_logo.svg'
import React, {useState} from 'react'
import { FaSignInAlt, FaUser, FaSignOutAlt, FaSearch } from 'react-icons/fa'
import styles from '../Styles/Header.module.css'
import { useAuth } from './AuthContext'
import { useUser } from './UserContext'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { logoutUser } from '../ConnectionToBackend/Routes/logoutUser'

function Header(){
    const { isAuthenticated, login, logout } = useAuth();
    const { user } = useUser();

    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    //Activamos la navegacion
    const navigate = useNavigate();

    //Forma para checar que el sistema desactive el menú hamburguesa
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    //Checamos si estamos en una página de registro o login para no mostrar ciertos datos
    const isAuthPage = location.pathname === '/login' || 
                       location.pathname === '/signup' ||
                       location.pathname === '/change_password';
    const isMainPage = location.pathname === '/main-page';

    const configUser = () => {
        setShowDropdown(false);
        navigate("/user-settings", { state: {user: 
            {
                'idUsuario': user?.idUsuario,
                'nombre': user?.nombre,
                'areaTrabajo': user?.areaTrabajo,
                'telefono': user?.telefono,
                'presupuesto': user?.presupuesto,
                'categorias': user?.categorias
            } 
        }})
    }

    const logingOut = async() => {
        setShowDropdown(false);
        await logoutUser(user?.correo);
        logout();
        navigate("");
    }

    return (
        <div className={styles.Header}>
            <Link to={'/'} className={`${styles.HeaderLink}`}>
                <div className={styles.MainHeaderSection}>
                    <img src={app_logo} className={styles.AppLogo}  alt='logo'/>
                    <h1 className={styles.HeaderText}>CROWDFOUNDER</h1>
                </div>
            </Link>
            <div className={styles.HeaderButtons}>
                {isMainPage && (
                    <div className={styles.searchContainer}> 
                        <div className={styles.searchContainerInput}>
                            <FaSearch className={styles.searchIcon}/>
                            <input type='text' placeholder='Buscar proyectos' className={styles.searchInput}/>
                        </div>
                        <button className={styles.searchButton}>
                            Buscar
                        </button>
                    </div>
                )}

                {!isAuthPage && (
                    !isAuthenticated ?(
                        <>  
                            <Link to={'/login'} style={{textDecoration: 'none'}}>
                                <button className={`${styles.HeaderButton} ${styles.LoginBtn}`}>
                                    <FaSignInAlt className={styles.Icon}/> Login
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div>
                            <button className={`${styles.userBtn}`} onClick={toggleDropdown}>
                                <FaUser/>
                            </button>
                            {showDropdown && (
                                <div className={styles.UserDropdown}>
                                    <div className={styles.UserDetails}>
                                        <div className={styles.UserImage}>
                                            <FaUser className={styles.ProfileIcon}/>
                                        </div>
                                        <div className={styles.UserInfo}>
                                            <strong>{user?.nombre}</strong>
                                            <p>{user?.correo}</p>
                                        </div>
                                    </div>
                                    <button className={styles.DropdownItem} onClick={configUser}>
                                        Configurar usuario
                                    </button>
                                    <button className={styles.DropdownItem} onClick={logingOut}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Header;