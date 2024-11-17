import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import styles from '../Styles/ComponentStyles/UserMenu.module.css';
import { logoutUser } from '../ConnectionToBackend/Routes/logoutUser';
import { useNavigate } from 'react-router-dom';

// Manejamos los datos recibidos
interface UserMenuProps {
    user: any;
    logout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, logout }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // Activar o desactivar el menú desplegable
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    // Función para hacer logout
    const handleLogout = async () => {
        await logoutUser(user?.correo);
        logout();
        navigate("/");
    };

    // Función para manejar la configuración de usuario
    const handleModifyUser = () => {
        navigate("/user-settings", {
            state: {
                user: {
                    'idUsuario': user?.idUsuario,
                    'nombre': user?.nombre,
                    'areaTrabajo': user?.areaTrabajo,
                    'telefono': user?.telefono,
                    'presupuesto': user?.presupuesto,
                    'categorias': user?.categorias
                }
            }
        });
    };

    return (
        <div>
            <button className={styles.UserBtn} onClick={toggleDropdown}>
                <FaUser />
            </button>
            {showDropdown && (
                <div className={styles.UserDropdown}>
                    <div className={styles.UserDetails}>
                        <div className={styles.UserImage}>
                            <FaUser className={styles.ProfileIcon} />
                        </div>
                        <div className={styles.UserInfo}>
                            <strong>{user?.nombre}</strong>
                            <p>{user?.correo}</p>
                        </div>
                    </div>
                    {/* Opciones comunes para todos los usuarios */}
                    <button className={styles.DropdownItem} onClick={handleModifyUser}>
                        Configurar usuario
                    </button>
                    
                    {/* Opciones específicas para administradores */}
                    {user?.role === "admin" ? (
                        <>
                            <button className={styles.DropdownItem} onClick={() => navigate("/admin/donations-management")}>
                                Gestión de Donaciones
                            </button>
                            <button className={styles.DropdownItem} onClick={() => navigate("/admin/user-management")}>
                                Gestión de Usuarios
                            </button>
                            <button className={styles.DropdownItem} onClick={() => navigate("/admin/project-validation")}>
                                Validación de Proyectos
                            </button>
                            <button className={styles.DropdownItem} onClick={() => navigate("/admin/event-configuration")}>
                                Configuración de Eventos
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={styles.DropdownItem} onClick={() => navigate("/user-projects")}>
                                Mis Proyectos
                            </button>
                            <button className={styles.DropdownItem} onClick={() => navigate("/user-donations")}>
                                Mis Donaciones
                            </button>
                        </>
                    )}
                    
                    {/* Opción de logout común para todos los usuarios */}
                    <button className={styles.DropdownItem} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;

