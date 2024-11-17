import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileText } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../Components/UserContext'; // Asegúrate de la ruta del contexto
import styles from '../../Styles/DonationsManagement.module.css'; // Importa el archivo CSS correctamente

const DonationsManagement = () => {
    const { user } = useUser(); // Obtener el usuario actual desde el contexto

    const listaDonaciones = [
        {
            projectoName: "Proyecto A",
            donadorName: "Juan Pérez",
            fecha_donacion: "2024-11-10",
            monto: 100
        },
        {
            projectoName: "Proyecto B",
            donadorName: "María López",
            fecha_donacion: "2024-11-09",
            monto: 200
        },
        {
            projectoName: "Proyecto C",
            donadorName: "Carlos Ramírez",
            fecha_donacion: "2024-11-08",
            monto: 150
        }
    ];

    return (
        <div className={styles.fullPage}>
            <h1 className={styles.title}>Monitoreo de Donaciones</h1>
            <div className={styles.container}>
                {listaDonaciones.length === 0 ? (
                    <p className={styles.noResults}>No existen donaciones en el sistema</p>
                ) : (
                    <div className={styles.scroller}>
                        {listaDonaciones.map((donacion, index) => (
                            <div key={index} className={styles.donacionesContainer}>
                                <FontAwesomeIcon icon={faFileText} className={styles.icon} />
                                <div className={styles.infoDonationContainer}>
                                    <p className={styles.infoDescription}>{donacion.projectoName}</p>
                                    {user?.role === 'admin' && (
                                        <p className={styles.infoDonadorText}>
                                            Encargado de la donación:
                                            <span className={styles.infoDonadorName}> {donacion.donadorName}</span>
                                        </p>
                                    )}
                                    <p className={styles.infoDonationText}>Fecha de donación: {donacion.fecha_donacion}</p>
                                    <p className={styles.infoDonationText}>Monto de donación: ${donacion.monto}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationsManagement;
