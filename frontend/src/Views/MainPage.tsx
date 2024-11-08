import React, {useEffect, useState} from 'react';
import styles from '../Styles/MainPage.module.css';
import { useLocation } from 'react-router-dom';

import { useUser } from '../Components/UserContext';
import CategoryContent from '../Components/CategoryContent';
import { getProjects } from '../ConnectionToBackend/Routes/getProjects';

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
    media: string[]
}

function MainPage(){
    //Manejamos el recibo de parámetros
    const location = useLocation();
    const { setUser } = useUser();
    const user = location.state?.user; //Recibimos al usuario

    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [featuredProject, setFeaturedProject] = useState<Proyecto | null>(null);
    const [recommendedProjects, setRecommendedProjects] = useState<Proyecto[]>([]);

    console.log("Proyectos recibidios en el sistema: ", proyectos);

    useEffect(() => {
        //Asumimos que obtenemos los datos del usuario de otro modo
        const userData = location.state?.user;
        if (userData){
            setUser(userData)
        }
    }, [location, setUser]);

    useEffect(() => {
        //Otro useEffect independiente que está conectado con el getter del sistema
        const getProyectos = async() => {
            const fetchedProyectos = await getProjects();
            setProyectos(fetchedProyectos);
            categorizeProjects(fetchedProyectos);
        }

        getProyectos();
    }, [])

    //Filtrar proyectos
    const categorizeProjects = (fetchedProyectos: Proyecto[]) => {
        if (!fetchedProyectos.length) return;
        
        //Determinamos el proyecto destacado
        const ordenadosPorFondos = fetchedProyectos.sort((a, b) => 
            (b.fondos_recaudados / b.objetivo_financiero) - (a.fondos_recaudados / a.objetivo_financiero)
        );
        setFeaturedProject(ordenadosPorFondos[0]);

        //Filtrar por proyectos recomendados por las categorías del usuario
        const filteredProjects = fetchedProyectos.filter(proyecto => 
            proyecto.categorias.some(categoria => user.categorias.includes(categoria))
        );
        setRecommendedProjects(filteredProjects);
    }

    const categories = user.categorias || [];

    return (
        <>
            <CategoryContent categories={categories}/>
            <div className={styles.Mainpage}>
                <div className={styles.Featured}>
                    <h2>Proyecto destacado:</h2>
                    {featuredProject && (
                        <div>
                            <img src={featuredProject.media[0]}/>

                            <h3>{featuredProject.nombre}</h3>
                            <p>{featuredProject.descripcion}</p>
                        </div>
                    )}
                </div>
                <div className={styles.Recommended}>
                    <h2>Proyectos recomendados:</h2>

                    {recommendedProjects.map(project => (
                        <div key={project.idProyecto}>
                            <img src={project.media[0]}/>
                            <h3>{project.nombre}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </>
        
    )
}

export default MainPage;