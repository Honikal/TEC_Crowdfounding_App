import app_logo from '../app_logo.svg'
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'
import '../Styles/Header.css'
import { useAuth } from './AuthContext'
import { Link, useLocation } from 'react-router-dom';

function Header(){
    const { isAuthenticated, login, logout } = useAuth();
    const location = useLocation();

    //Checamos si estamos en una página de registro o login para no mostrar ciertos datos
    const isAuthPage = location.pathname === '/login' || location.pathname == '/signup';

    return (
        <div className='Header'>
            <img src={app_logo} className="App-logo"  alt='logo'/>
            <h1 className='Header-text'>CROWDFOUNDER</h1>
            <div className='Header-buttons'>
                {!isAuthPage && (
                    !isAuthenticated ?(
                        <>  
                            <Link to={'/login'}>
                                <button className='Header-button LoginBtn' >
                                    <FaSignInAlt className='Icon'/> Login
                                </button>
                            </Link>

                            <Link to={'/signup'}>
                                <button className='Header-button SignUpBtn'>
                                    <FaUserPlus className='Icon'/> Sign Up
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <button className='Header-button LogoutBtn'>
                                <FaSignOutAlt className='Icon'/> Logout
                            </button>
                        </>
                    )
                )}
            </div>
        </div>
    )
}

export default Header;