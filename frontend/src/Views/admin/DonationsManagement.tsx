import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileText } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../Components/UserContext'; // Asegúrate de la ruta del contexto
import styles from '../../Styles/DonationsManagement.module.css'; // Importa el archivo CSS correctamente
import { useLocation } from 'react-router-dom';
import { getDonations } from '../../ConnectionToBackend/Routes/getDonations';

interface Donation {
    fecha_donacion: string,
    hora_donacion: string,
    idDonante: string,
    idProyecto: string,
    monto_donado: number,

    nombre_donante: string,
    nombre_proyecto: string
}

const DonationsManagement = () => {
    const location = useLocation();
    const { setUser } = useUser();
    const user = location.state?.user;        //Recibimos al usuario

    const [listaDonaciones, setListaDonaciones] = useState<Donation[]>([]);

    //Agregamos paginación
    const [paginaActual, setPaginaActual] = useState(1);
    const [donacionesPorPagina] = useState(4); //5 páginas a mostrar en la página máximo

    useEffect(() => {
        //Asumimos que obtenemos los datos del usuario de otro modo
        const userData = location.state?.user;
        if (userData){
            setUser(userData);
        }

        const getListedDonations = async() => {
            const donaciones = await getDonations();
            setListaDonaciones(donaciones); 
        }
        getListedDonations();
    }, [location, setUser])

    //Calculamos las donaciones a mostrar
    const indexOfLastDonation = paginaActual * donacionesPorPagina; 
    const indexOfFirstDonation = indexOfLastDonation - donacionesPorPagina;
    const donacionesActuales = listaDonaciones.slice(indexOfFirstDonation, indexOfLastDonation);

    //Control de paginación
    const totalPages = Math.ceil(listaDonaciones.length / donacionesPorPagina);

    //Si la página actual no es la última página, en dicho caso, se avanza
    const handleNextPage = () => {
        if (paginaActual < totalPages) setPaginaActual((prev) => prev + 1)
    }

    //Si la página actual no es la inicial, en dicho caso, se va hacia atrás
    const handlePreviousPage = () => {
        if (paginaActual > 1) setPaginaActual((prev) => prev - 1)
    }

    //En el caso que el usuario directamente escriba la página a mostrar, entonces lo seleccionamos
    const handlePageSelect = (page: number) => {
        setPaginaActual(page);
    }

    console.log("Usuario recibido: ", user);

    return (
        <div className={styles.fullPage}>
            <h1 className={styles.title}>Monitoreo de Donaciones</h1>
            <div className={styles.container}>
                {listaDonaciones.length === 0 ? (
                    <p className={styles.noResults}>No existen donaciones en el sistema</p>
                ) : (
                    <div className={styles.scroller}>
                        {donacionesActuales.map((donacion, index) => (
                            <div key={index} className={styles.donacionesContainer}>
                                <FontAwesomeIcon icon={faFileText} className={styles.icon} />
                                <div className={styles.infoDonationContainer}>
                                    <p className={styles.infoDescription}>{donacion.nombre_proyecto}</p>
                                    {user?.role === 'admin' && (
                                        <p className={styles.infoDonadorText}>
                                            Encargado de la donación:
                                            <span className={styles.infoDonadorName}> {donacion.nombre_donante}</span>
                                        </p>
                                    )}
                                    <p className={styles.infoDonationText}>Fecha de donación: {donacion.fecha_donacion}</p>
                                    <p className={styles.infoDonationText}>Monto de donación: ${donacion.monto_donado}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/*Sistema de paginación de pantallas*/}
                <div className={styles.Pagination}>
                    <button
                        className={`${styles.PaginationButton} ${paginaActual === 1 ? styles.Disabled : ''}`}
                        onClick={handlePreviousPage}
                        disabled={paginaActual === 1}
                    > {'<'} </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`${styles.PaginationButton} ${paginaActual === i + 1 ? styles.Active : ''}`}
                            onClick={() => handlePageSelect(i + 1)}
                        >
                            { i + 1 }
                        </button>
                    ))}
                    <button
                        className={`${styles.PaginationButton} ${paginaActual === totalPages ? styles.Disabled : ''}`}
                        onClick={handleNextPage}
                        disabled={paginaActual === totalPages}
                    > {'>'} </button>

                </div>
            </div>
        </div>
    );
};

export default DonationsManagement;
