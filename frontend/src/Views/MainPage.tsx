import React, {useEffect, useState} from 'react';
import styles from '../Styles/MainPage.module.css';
import { FaUser, FaCalendarDay } from 'react-icons/fa';


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
    media: string[],

    nombre_creador: string,
    diasRestantes: number,
    porcentajeFundado: number
}

function MainPage(){
    //Manejamos el recibo de parámetros
    const location = useLocation();
    const { setUser } = useUser();
    const user = location.state?.user; //Recibimos al usuario

    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [featuredProject, setFeaturedProject] = useState<Proyecto | null>(null);
    const [recommendedProjects, setRecommendedProjects] = useState<Proyecto[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
            setSelectedCategories(userData.categorias);
            console.log("Asignamos las categorías del usuario: ", userData.categorias);
        }
    }, [location, setUser]);

    useEffect(() => {
        //Otro useEffect independiente que está conectado con el getter del sistema
        const getProyectos = async() => {
            const fetchedProyectos = await getProjects();
            setProyectos(fetchedProyectos);
            categorizeProjects(fetchedProyectos, selectedCategories);
        }
        getProyectos();
    }, [selectedCategories])

    //Filtrar proyectos
    const categorizeProjects = (fetchedProyectos: Proyecto[], categorias: string[]) => {
        //Filtramos proyectos no expirados
        const activeProyectos = fetchedProyectos.filter(proyecto => proyecto.diasRestantes > 0);

        //Filtrar por proyectos recomendados por las categorías del usuario
        const filteredProjects = categorias.length > 0 
            ? fetchedProyectos.filter(proyecto => 
                proyecto.categorias.some(categoria => categorias.includes(categoria))
            )
            : fetchedProyectos;

        if (activeProyectos.length){
            //Determinamos el proyecto destacado
            const ordenadosPorFondos = filteredProjects.sort((a, b) => 
                (b.fondos_recaudados / b.objetivo_financiero) - (a.fondos_recaudados / a.objetivo_financiero)
            );
            setFeaturedProject(ordenadosPorFondos[0]);
        }
        setRecommendedProjects(filteredProjects);
    }

    //Manejar el sistema de elección de nuevas categorías
    const handleCategoryClick = (categoria: string) => {
        const newCategories = selectedCategories.includes(categoria)
            ? selectedCategories.filter(c => c !== categoria)
            : [...selectedCategories, categoria]

        console.log("Lista categorias anteriores: ", selectedCategories);
        console.log("Lista de categorías nuevas: ", newCategories);

        setSelectedCategories(newCategories);
        categorizeProjects(proyectos, newCategories)
    }

    return (
        <>
            <CategoryContent categories={totalCategorias}/>
            <div className={styles.Categories}>
                {totalCategorias.map(categoria => (
                    <div
                        key={categoria}
                        className={`${styles.Category} ${styles.SelectCategory}
                        ${selectedCategories.includes(categoria) ? styles.Selected : ''}`}
                        onClick={() => handleCategoryClick(categoria)}
                    >
                        <p>{categoria}</p>
                    </div>
                ))}
            </div>

            <div className={styles.Mainpage}>

                <div className={styles.Featured}>
                    <h2>Proyecto destacado:</h2>
                    {featuredProject && (
                        <div className={styles.FeaturedProject}>
                            <img src={featuredProject.media[0]} alt={featuredProject.nombre}/>
                            <div className={styles.UserDisplay}>
                                <FaUser className={styles.userIcon}/>
                                <div className={styles.UserInfo}>
                                    <h3>{featuredProject.nombre}</h3>
                                    <p className={styles.infoProyecto}>{featuredProject.nombre_creador}</p>
                                    <div className={styles.timeFundsData}>
                                        <FaCalendarDay className={styles.calendarIcon}></FaCalendarDay>
                                        <p>{featuredProject.diasRestantes} días restantes</p>
                                        <p>{featuredProject.porcentajeFundado}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.Description}>
                                <p id={styles.desc}>{featuredProject.descripcion}</p>
                                <div className={styles.Categories}>
                                    {featuredProject.categorias.map(categoria => (
                                        <div
                                            className={`${styles.Category}
                                            ${selectedCategories.includes(categoria) ? styles.Selected : ''}`}>
                                            <p>{categoria}</p>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.Recommended}>
                    <h2>Proyectos recomendados:</h2>

                    {recommendedProjects.map(project => (
                        <div
                            key={project.idProyecto}
                            className={`
                                ${styles.RecommendedProyecto}
                                ${project.diasRestantes <= 0 ? styles.ProjectExpired : ''} 
                            `}
                        >
                            <img src={project.media[0]}/>
                            <div className={styles.UserDisplay}>
                                <FaUser className={styles.userIcon}/>
                                <div className={styles.UserInfo}>
                                    <h3>{project.nombre}</h3>
                                    <p className={styles.infoProyecto}>{project.nombre_creador}</p>
                                    <div className={styles.timeFundsData}>
                                        <FaCalendarDay className={styles.calendarIcon}></FaCalendarDay>
                                        <p>{project.diasRestantes} días restantes</p>
                                        <p>{project.porcentajeFundado}</p>
                                    </div>
                                </div>
                            </div>
                            {project.diasRestantes <= 0 && (
                                <p className={styles.expiredMessage}>Éste proyecto ha finalizado su etapa de recolección</p>
                            )}

                            <div className={styles.Categories}>
                                {project.categorias.map(categoria => (
                                    <div
                                        className={`${styles.Category}
                                        ${selectedCategories.includes(categoria) ? styles.Selected : ''}`}>
                                        <p>{categoria}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
        
    )
}

export default MainPage;