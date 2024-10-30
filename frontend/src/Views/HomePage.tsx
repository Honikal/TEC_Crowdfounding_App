import React from 'react';
import logo from '../logo.svg';
import '../Styles/HomePage.css';

function HomePage(){
    return (
        <div className='Homepage'>
            <div className='Content-Left'>
                <h1 className='Slogan'>Impulsa tus ideas con la comunidad</h1>
                <p className='Description'>
                    Lleva tus proyectos a ser más que ideas. Conecta, colabora y financia proyectos estudiantiles
                </p>
                <button className='Action-button'>Empieza ahora</button>
            </div>
            <div className='Content-Right'>
                {/*Acá incluiremos imagen o demo de cada uno de las características: */}
                <img src={logo} className='Feature-image' alt="Demostracion1"/>
                <div className='Feature'>
                    <h3>Crea Proyectos</h3>
                    <p>Comparte tus ideas y construye algo increíble</p>
                </div>


                <div className='Feature'>
                    <h3>Financia Ideas</h3>
                    <p>Únete al grupo, colabora y participa donando futuros proyectos</p>
                </div>

                <div className='Feature'>
                    <h3>Forma parte como mentor</h3>
                    <p>Únete y demuestra tus capacidades de mentoría, y tendrás chance de ser contratado en un proyecto</p>
                </div>
            </div>


        </div>
    )
}

export default HomePage;