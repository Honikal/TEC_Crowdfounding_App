import React, {useEffect, useState} from 'react';
import styles from '../Styles/MyDonations.module.css';
import { FaUser, FaCalendarDay } from 'react-icons/fa';


import { useLocation } from 'react-router-dom';
import { useUser } from '../Components/UserContext';
import CategoryContent from '../Components/CategoryContent';
import { getDonationsUser } from '../ConnectionToBackend/Routes/getDonationsUser';

interface Donation {
    fecha_donacion: string,
    hora_donacion: string,
    idDonante: string,
    idProyecto: string,
    monto_donado: number,

    nombre_donante: string,
    nombre_proyecto: string
}

function MyDonationsPage(){
    //Manejamos el recibo de parámetros
    const location = useLocation();
    const { setUser } = useUser();
    const user = location.state?.user;        //Recibimos al usuario

    const [donaciones, setDonaciones] = useState<Donation[]>([]);
    const [totalCategorias, setTotalCategorias] = useState<string[]>([
        "Tecnología", 
        "Cocina",
        "Videojuegos", 
        "Educación", 
        "Social", 
        "Ciencia", 
        "Arte", 
        "Salud y bienestar",
        "Cómics",
        "Música",
        "Artesanías"
    ])

    useEffect(() => {
        //Asumimos que obtenemos los datos del usuario de otro modo
        const userData = location.state?.user;
        if (userData){
            setUser(userData);
        }

        const getDonations = async() => {
            const donaciones = await (getDonationsUser(user.idUsuario))
            setDonaciones(donaciones);
        }
        getDonations();
    }, [location, setUser]);

    const DisplayDonationContent = (donacion: Donation) => {
        return (
            <div className={styles.ContentDonation}>  
                <h3>{donacion.nombre_proyecto}</h3>
                <div className={styles.ShownContainer}>
                    <p>Fecha de donación: {donacion.fecha_donacion}</p>
                    <p>Hora de donación: {FormatTimezoneHour(donacion.hora_donacion)}</p>
                    <p>Monto donado: ${donacion.monto_donado}</p>
                </div>
            </div>
        )
    }

    const FormatTimezoneHour = (time: string) => {
        //Dividimos la hora en 3 partes, horas minutos y segundos
        const parts = time.split(':'); 
        let hours = parseInt(parts[0]);
        const minutes = parts[1];
        const seconds = parts[2];

        let period = 'a.m';
        if (hours >= 12){
            period = 'p.m';
            if (hours > 12) {
                hours -= 12; //Convertimos al formato de 12 horas
            }
        } else if (hours === 0) {
            //En caso de hora 0, significa que estamos a media noche o 12:00 a.m
            hours = 12;
        }

        return `${hours}:${minutes}:${seconds} ${period}`;
    }

    return (
        <>
            <CategoryContent categories={totalCategorias} user={user}/>
            <div className={styles.MyDonationsPage}>
                {donaciones.map(donacion => (
                    <div className={styles.Donation}>
                        {DisplayDonationContent(donacion)}
                    </div>
                ))}
            </div>
        </>
        
    )
}

export default MyDonationsPage;