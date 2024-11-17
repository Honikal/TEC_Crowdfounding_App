import React, { useState, useEffect } from "react";
import { getUsers } from "../../ConnectionToBackend/Routes/getUsers"; // Ruta correcta a la API
import styles from "../../Styles/UserManagement.module.css"; // Archivo CSS para estilos

const UserManagement = () => {
  interface User {
    id: string;
    nombre_completo: string; // Cambiado para reflejar la propiedad real
    activa: boolean;
    area_trabajo: string;
    cedula: string;
    correo: string;
    telefono: string;
    rol: string;
    presupuesto: number;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usuariosData = await getUsers(); // Llamada a la API
        console.log("Usuarios obtenidos del backend:", usuariosData); // Verifica los datos en la consola

        if (Array.isArray(usuariosData)) {
          setUsers(usuariosData); // Asegúrate de que sea un array
        } else {
          throw new Error("Los datos recibidos no tienen el formato esperado");
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setError(
          "Hubo un problema al cargar los usuarios. Por favor, intenta nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUserActive = async (id: string) => {
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, activa: !user.activa } : user
        )
      );
      // Aquí podrías agregar una llamada a la API para actualizar el estado en el backend
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
      alert("Hubo un problema al actualizar el estado del usuario.");
    }
  };

  const manageUserProfile = (user: User) => {
    const action = user.activa ? "desactivar" : "activar";
    if (
      window.confirm(
        `¿Estás seguro de que deseas ${action} la cuenta de ${user.nombre_completo}?`
      )
    ) {
      toggleUserActive(user.id);
      alert(
        `La cuenta de ${user.nombre_completo} ha sido ${
          user.activa ? "activada" : "desactivada"
        }.`
      );
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

  if (error) {
    return <p className={styles.errorMessage}>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gestión de Usuarios</h1>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userContainer}>
            <div className={styles.userInfo}>
              <h3 className={styles.userName}>{user.nombre_completo}</h3>
              <p className={styles.userDetails}>
                {user.correo} | {user.telefono}
              </p>
            </div>
            <div className={styles.actions}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
