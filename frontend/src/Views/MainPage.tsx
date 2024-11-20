import React, { useEffect, useState } from 'react';
import styles from '../Styles/MainPage.module.css';
import { FaUser, FaCalendarDay } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const location = useLocation();
    const { setUser } = useUser();
    const user = location.state?.user;
    const navigate = useNavigate();
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [videoIndexes, setVideoIndexes] = useState<{ [key: string]: number }>({});
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [featuredProject, setFeaturedProject] = useState<Proyecto | null>(null);
    const [recommendedProjects, setRecommendedProjects] = useState<Proyecto[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    const [totalCategorias] = useState<string[]>([
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
    ]);

    useEffect(() => {
        const userData = location.state?.user;
        if (userData) {
            setUser(userData);
            setSelectedCategories(userData.categorias || []); // Valor por defecto de array vacío
            console.log("Asignamos las categorías del usuario: ", userData.categorias);
        }
    }, [location, setUser]);

    useEffect(() => {
        const fetchVideoIndexes = async (projects: Proyecto[]) => {
            const indexes: { [key: string]: number } = {};
            for (const proj of projects) {
                const videoIndex = await getFirstVideoIndex(proj.media);
                indexes[proj.idProyecto] = videoIndex;
            }
            setVideoIndexes(indexes);
        };

        const getProyectos = async () => {
            try {
                const fetchedProyectos = await getProjects();
                setProyectos(fetchedProyectos);
                categorizeProjects(fetchedProyectos, selectedCategories);
                await fetchVideoIndexes(fetchedProyectos);
            } catch (error) {
                console.error("Error al obtener proyectos:", error);
            }
        };
        getProyectos();
    }, [selectedCategories]);

    const categorizeProjects = (fetchedProyectos: Proyecto[], categorias: string[] = []) => {
        const activeProyectos = fetchedProyectos.filter(proyecto => proyecto.diasRestantes > 0);

        const filteredProjects = categorias.length > 0
            ? fetchedProyectos.filter(proyecto =>
                proyecto.categorias && proyecto.categorias.some(categoria => categorias.includes(categoria))
            )
            : fetchedProyectos;

        if (activeProyectos.length) {
            const ordenadosPorFondos = filteredProjects.sort((a, b) =>
                (b.fondos_recaudados / b.objetivo_financiero) - (a.fondos_recaudados / a.objetivo_financiero)
            );
            setFeaturedProject(ordenadosPorFondos[0]);
        }
        setRecommendedProjects(filteredProjects);
    };

    const handleCategoryClick = (categoria: string) => {
        const newCategories = selectedCategories.includes(categoria)
            ? selectedCategories.filter(c => c !== categoria)
            : [...selectedCategories, categoria];

        console.log("Lista de categorías nuevas: ", newCategories);

        setSelectedCategories(newCategories);
        categorizeProjects(proyectos, newCategories);
    };

    const isVideoFile = async (fileUrl: string): Promise<boolean> => {
        try {
            const response = await fetch(fileUrl);
            const contentType = response.headers.get("Content-Type");
            return contentType?.startsWith("video/") ?? false;
        } catch (error) {
            console.error("Error fetching file metadata:", error);
            return false;
        }
    };

    const getFirstVideoIndex = async (media: string[]): Promise<number> => {
        for (let i = 0; i < media.length; i++) {
            const isVideo = await isVideoFile(media[i]);
            if (isVideo) {
                return i;
            }
        }
        return -1;
    };

    const navigateToProject = (proyecto: Proyecto) => {
        navigate(`/project/${proyecto.idProyecto}`, { state: { user, project: proyecto } });
    };

    const DisplayProjectContent = (proyecto: Proyecto) => {
        const videoIndex = videoIndexes[proyecto.idProyecto] ?? -1;

        return (
            <>
                <div
                    className={styles.mediaContainer}
                    onMouseEnter={() => setHoveredProject(proyecto.idProyecto)}
                    onMouseLeave={() => setHoveredProject(null)}
                >
                    {hoveredProject === proyecto.idProyecto && videoIndex !== -1 ? (
                        <video
                            src={proyecto.media[videoIndex]}
                            className={styles.previewVideo}
                            controls
                            autoPlay
                            muted
                            loop
                            preload='metadata'
                        />
                    ) : (
                        <img
                            src={proyecto.media[0]}
                            alt={proyecto.nombre}
                            className={styles.previewImage}
                        />
                    )}
                </div>
                <div className={styles.UserDisplay}>
                    <FaUser className={styles.userIcon} />
                    <div className={styles.UserInfo}>
                        <h3>{proyecto.nombre}</h3>
                        <p className={styles.infoProyecto}>{proyecto.nombre_creador}</p>
                        <div className={styles.timeFundsData}>
                            <FaCalendarDay className={styles.calendarIcon} />
                            <p>{proyecto.diasRestantes} días restantes</p>
                            <p>{proyecto.porcentajeFundado}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.Description}>
                    <p id={styles.desc}>{proyecto.descripcion}</p>
                    <div className={styles.Categories}>
                        {proyecto.categorias && proyecto.categorias.map(categoria => (
                            <div
                                key={categoria}
                                className={`${styles.Category} ${selectedCategories.includes(categoria) ? styles.Selected : ''}`}
                            >
                                <p>{categoria}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <CategoryContent categories={totalCategorias} user={user} />
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
                        <div className={styles.FeaturedProject} onClick={() => navigateToProject(featuredProject)}>
                            {DisplayProjectContent(featuredProject)}
                        </div>
                    )}
                </div>
                <div className={styles.Recommended}>
                    <h2>Proyectos recomendados:</h2>
                    {recommendedProjects.map(project => (
                        <div
                            key={project.idProyecto}
                            className={`${styles.RecommendedProyecto} ${project.diasRestantes <= 0 ? styles.ProjectExpired : ''}`}
                            onClick={() => navigateToProject(project)}
                        >
                            {DisplayProjectContent(project)}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MainPage;
