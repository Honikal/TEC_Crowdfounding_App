import React from 'react';
import logo from '../logo.svg';
import styles from '../Styles/HomePage.module.css';

function HomePage(){
    return (
        <div className={styles.Homepage}>
            <div className={styles.ContentLeft}>
                <h1 className={styles.Slogan}>Impulsa tus ideas con la comunidad</h1>
                <p className={styles.Description}>
                    Lleva tus proyectos a ser más que ideas. Conecta, colabora y financia proyectos estudiantiles
                </p>
                <button className={styles.ActionButton}>Empieza ahora</button>
            </div>
            <div className={styles.ContentRight}>
                {/*Acá incluiremos imagen o demo de cada uno de las características: */}
                <img src={logo} className='Feature-image' alt="Demostracion1"/>
                <div className={styles.Feature}>
                    <h3>Crea Proyectos</h3>
                    <p>Comparte tus ideas y construye algo increíble</p>
                </div>


                <div className={styles.Feature}>
                    <h3>Financia Ideas</h3>
                    <p>Únete al grupo, colabora y participa donando futuros proyectos</p>
                </div>

                <div className={styles.Feature}>
                    <h3>Forma parte como mentor</h3>
                    <p>Únete y demuestra tus capacidades de mentoría, y tendrás chance de ser contratado en un proyecto</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage;