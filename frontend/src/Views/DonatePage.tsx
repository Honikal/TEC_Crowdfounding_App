import React, {useEffect, useState, ChangeEvent} from 'react';
import styles from '../Styles/DonatePage.module.css';
import { FaEdit, FaMoneyBillWave } from 'react-icons/fa';

import { useLocation } from 'react-router-dom';
import { useUser } from '../Components/UserContext';
import { donateProject } from '../ConnectionToBackend/Routes/donateProject';

interface Proyecto {
    idProyecto: string,
    id_creador: string,
    activa: boolean,
    nombre: string,
    descripcion: string,
    categorias: string[],
    fecha_creacion: string,
    fecha_limite: string,
    fondos_recaudados: number,
    objetivo_financiero: number,
    media: string[],

    nombre_creador: string,
    diasRestantes: number,
    porcentajeFundado: number
}

function DonatePage(){
    //Manejamos el recibo de parámetros
    const location = useLocation();
    const { setUser } = useUser();
    const user = location.state?.user;        //Recibimos al usuario
    const proyecto = location.state?.project as Proyecto //Recibimos el proyecto seleccionado

    const [montoDonar, setMontoDonar] = useState<number>(0.00);
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);

    const handleMontoChange = (e: ChangeEvent<HTMLInputElement>) => setMontoDonar(parseFloat(e.target.value));

    useEffect(() => {
        //Asumimos que obtenemos los datos del usuario de otro modo
        const userData = location.state?.user;
        if (userData){
            setUser(userData);
        }
    }, [location, setUser]);

    const optionClicked = () => { setButtonClicked(true); }

    const donateToProject = async() => {
        //Primero que todo, validamos la entrada de datos
        if (Number.isNaN(montoDonar) || montoDonar < 0){
            alert("La entrada al punto de donación debe de ser un número cuyos dígitos son mayores al 0");
            return;
        }

        const restaPresupuesto = user.presupuesto - montoDonar;
        if (restaPresupuesto < 0){
            alert("El saldo de su cuenta no cumple con los requisitos, por favor, reduzca la cantidad a donar o recargue su cuenta");
            return;
        }

        //Si no hay problemas, por ahora alertamos simplemente
        await donateProject(proyecto.idProyecto, user.idUsuario, montoDonar);
    }

    return (
        <>
            <div className={styles.DonatePage}>

                <div className={styles.DonateTitle}>
                    <h1>{proyecto.nombre}</h1>
                    <p>de {proyecto.nombre_creador}</p>
                </div>

                <div className={styles.DonationSection}>
                    {/*
                        Cuando manejemos dinero real, acá tendremos un sistema para indicar el orden de la página
                        Recompensa > Complemento > Pagos

                        <div className={styles.Indications}>
                            <p>Recompensas</p>
                        </div>
                    */}
                    

                    <div className={styles.RewardSection}>
                        <h2>Selecciona tu recompensa</h2>
                        <p>Selecciona una opción a continuación</p>

                        <div
                            className={`
                                ${styles.ContributionNoReward}
                                ${buttonClicked ? styles.DisabledHover : ''}
                            `}
                            onClick={optionClicked}
                        >
                            <h3>Contribuir sin recompensa</h3>
                            <div className={`
                                ${styles.HiddenOption}
                                ${buttonClicked ? styles.ShownOption : ''}
                            `}>
                                <p>Monto de contribución</p>
                                <div className={styles.InputSection}>
                                    <div className={styles.Input}>
                                        <p>$</p>
                                        <input
                                            type='number'
                                            onChange={handleMontoChange}
                                        />
                                    </div>

                                    <div
                                        className={styles.DonateButton}
                                        onClick={donateToProject}
                                    >
                                        {/*
                                            Acá se enviaría al sistema de donación del Paypal, con la api del sistema
                                            <p>Continuar</p>
                                        */}
                                        <p>Donar</p>
                                    </div>
                                </div>
                                {/*<p>Aproxima</p>*/}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default DonatePage;