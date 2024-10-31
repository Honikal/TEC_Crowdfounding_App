import app_logo from '../app_logo.svg'
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'
import styles from '../Styles/Header.module.css'
import { useAuth } from './AuthContext'
import { Link, useLocation } from 'react-router-dom';

function Header(){
    const { isAuthenticated, login, logout } = useAuth();
    const location = useLocation();

    //Checamos si estamos en una página de registro o login para no mostrar ciertos datos
    const isAuthPage = location.pathname === '/login' || 
                       location.pathname === '/signup' ||
                       location.pathname === '/change_password';

    return (
        <div className={styles.Header}>
            <Link to={'/'} className={styles.HeaderLink}>
                <div className={styles.MainHeaderSection}>
                    <img src={app_logo} className={styles.AppLogo}  alt='logo'/>
                    <h1 className={styles.HeaderText}>CROWDFOUNDER</h1>
                </div>
            </Link>
            <div className={styles.HeaderButtons}>
                {!isAuthPage && (
                    !isAuthenticated ?(
                        <>  
                            <Link to={'/login'} style={{textDecoration: 'none'}}>
                                <button className={`${styles.HeaderButton} ${styles.LoginBtn}`}>
                                    <FaSignInAlt className={styles.Icon}/> Login
                                </button>
                            </Link>

                            <Link to={'/signup'} style={{textDecoration: 'none'}}>
                                <button className={`${styles.HeaderButton} ${styles.SignUpBtn}`}>
                                    <FaUserPlus className={styles.Icon}/> Sign Up
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <button className={`${styles.HeaderButton} ${styles.LogoutBtn}`}>
                                <FaSignOutAlt className={styles.Icon}/> Logout
                            </button>
                        </>
                    )
                )}
            </div>
        </div>
    )
}

export default Header;