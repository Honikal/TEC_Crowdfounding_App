import React, { useState, useEffect } from "react";
import styles from '../../Styles/UserManagement.module.css'; // Archivo CSS para estilos
import { getUsers } from "../../ConnectionToBackend/Routes/getUsers"; // Función para obtener los usuarios desde el backend

const UserManagement = () => {
    interface User {
        id: string;
        nombre: string;
        activa: boolean;
    }

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Obtiene los usuarios desde la API (en lugar de usar datos de ejemplo)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();  // Llamada al backend para obtener los usuarios
                setUsers(fetchedUsers);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Función para cambiar el estado activo de un usuario
    const toggleUserActive = (id: string) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, activa: !user.activa } : user
            )
        );
    };

    const manageUserProfile = (user: User) => {
        const action = user.activa ? "desactivar" : "activar";
        if (window.confirm(`¿Estás seguro de que deseas ${action} la cuenta de ${user.nombre}?`)) {
            toggleUserActive(user.id);
            alert(`La cuenta de ${user.nombre} ha sido ${user.activa ? "activada" : "desactivada"}.`);
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Cargando usuarios...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gestión de Usuarios</h1>
            <div className={styles.userList}>
                {users.map((user) => (
                    <div key={user.id} className={styles.userContainer}>
                        <span className={styles.userName}>{user.nombre}</span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={user.activa}
                                onChange={() => toggleUserActive(user.id)}
                            />
                            <span className={`${styles.slider} ${styles.round}`}></span>
                        </label>
                        <button
                            className={styles.manageButton}
                            onClick={() => manageUserProfile(user)}
                        >
                            Gestionar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;
