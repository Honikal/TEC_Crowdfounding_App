import React, {useState} from 'react'
import { FaUser } from 'react-icons/fa'
import styles from '../Styles/ComponentStyles/UserMenu.module.css'
import { logoutUser } from '../ConnectionToBackend/Routes/logoutUser'
import { useNavigate } from 'react-router-dom';


//Manejamos los datos recibidos
interface UserMenuProps {
    user: any;
    logout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, logout }) => {
    //Para manejar si está activado o no el dropdown
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    //Forma para checar que el sistema desactive el menú hamburguesa
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    //Función para hacer logout
    const handleLogout = async() => {
        await logoutUser(user?.correo);
        logout();
        navigate("/");
    }

    //Función para manejar el cambio del usuario
    const handleModifyUser = () => {
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

    return (
        <div>
            <button className={`${styles.UserBtn}`} onClick={toggleDropdown}>
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
                    <button className={styles.DropdownItem} onClick={handleModifyUser}>
                        Configurar usuario
                    </button>
                    <button className={styles.DropdownItem}>
                        Mis Proyectos
                    </button>
                    <button className={styles.DropdownItem}>
                        Mis donaciones
                    </button>
                    <button className={styles.DropdownItem} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
export default UserMenu
