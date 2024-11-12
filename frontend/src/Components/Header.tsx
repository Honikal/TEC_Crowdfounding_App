import app_logo from '../app_logo.svg'
import { FaSignInAlt } from 'react-icons/fa'
import styles from '../Styles/ComponentStyles/Header.module.css'

//Importamos lo necesario para el logout y su controlador
import { useAuth } from './AuthContext'
import { useUser } from './UserContext'
import { Link, useLocation, useNavigate } from 'react-router-dom';

//Menús divididos
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'

function Header(){
    const { isAuthenticated, login, logout } = useAuth();
    const { user } = useUser();
    const location = useLocation();
    const navigate = useNavigate();

    //Checamos si estamos en una página de registro o login para no mostrar ciertos datos
    /*
    const isAuthPage = location.pathname === '/' ||
                       location.pathname === '/login' || 
                       location.pathname === '/signup' ||
                       location.pathname === '/change_password';
    */

    const createProject = () => {
        navigate("/new-project", { state: {user}})
    }

    return (
        <div className={`
            ${styles.Header} 
            ${isAuthenticated ? styles.HeaderAuthenticated : ''}
        `}>
            <Link to={'/'} className={`${styles.HeaderLink}`}>
                <div className={styles.MainHeaderSection}>
                    <img src={app_logo} className={styles.AppLogo}  alt='logo'/>
                    <h1 className={styles.HeaderText}>CROWDFOUNDER</h1>
                </div>
            </Link>
            
            {isAuthenticated && user && (
                <SearchBar user={user}/>
            )}

            <div className={styles.HeaderButtons}>
                {isAuthenticated ? (
                        <>
                            <button className={styles.createProjectButton} onClick={createProject}>
                                Empieza un proyecto
                            </button>
                            <UserMenu user={user} logout={logout}/>
                        </>
                    ) : (
                        <>  
                            <Link to={'/login'} style={{textDecoration: 'none'}}>
                                <button className={`${styles.HeaderButton} ${styles.LoginBtn}`}>
                                    <FaSignInAlt className={styles.Icon}/> Login
                                </button>
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Header;