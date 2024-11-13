import React, {useEffect, useState} from 'react';
import styles from '../Styles/MyProjectsPage.module.css';
import { FaUser, FaCalendarDay } from 'react-icons/fa';


import { useLocation } from 'react-router-dom';
import { useUser } from '../Components/UserContext';
import CategoryContent from '../Components/CategoryContent';
import { getProjectsUser } from '../ConnectionToBackend/Routes/getProjectsUser';

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

function MyProjectsPage(){
    //Manejamos el recibo de parámetros
    const location = useLocation();
    const { setUser } = useUser();
    const user = location.state?.user;        //Recibimos al usuario

    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
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
    const [videoIndexes, setVideoIndexes] = useState<{ [key: string]: number }>({});


    useEffect(() => {
        //Asumimos que obtenemos los datos del usuario de otro modo
        const userData = location.state?.user;
        if (userData){
            setUser(userData);
        }

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
                    return i; // Return index if a video is found
                }
            }
            return -1; // Return -1 if no video is found
        };

        //Buscamos la existencia de un vídeo
        const fetchVideoIndexes = async (projects: Proyecto[]) => {
            const indexes: { [key: string]: number } = {};
            for (const proj of projects) {
                const videoIndex = await getFirstVideoIndex(proj.media);
                indexes[proj.idProyecto] = videoIndex
            }
            setVideoIndexes(indexes);
        };

        const getProyectos = async() => {
            const filteredProyectos = await (getProjectsUser(userData.idUsuario))
            setProyectos(filteredProyectos);
            await fetchVideoIndexes(filteredProyectos);
        }
        getProyectos();
    }, [location, setUser]);

    const DisplayProjectContent = (proyecto: Proyecto) => {
        //Tomamos la index del primer vídeo encontrado
        const videoIndex = videoIndexes[proyecto.idProyecto] ?? -1;

        return (
            <>  
                <div className={styles.ShownContainer}>
                    <div
                        className={styles.MediaContainer}
                        onMouseEnter={() => setHoveredProject(proyecto.idProyecto)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        {hoveredProject === proyecto.idProyecto && videoIndex !== -1 ? (
                            <video
                                src={proyecto.media[videoIndex]}
                                className={styles.VideoDisplay}
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
                                className={styles.ImageDisplay}
                            />
                        )}
                    </div>
                    <div className={styles.UserDisplay}>
                        <FaUser className={styles.UserIcon}/>
                        <div className={styles.UserInfo}>
                            <h3>{proyecto.nombre}</h3>
                            <p className={styles.infoProyecto}>{proyecto.nombre_creador}</p>
                            <div className={styles.TimeFundsData}>
                                <FaCalendarDay className={styles.CalendarIcon}></FaCalendarDay>
                                <p>{proyecto.diasRestantes} días restantes</p>
                                <p>{proyecto.porcentajeFundado}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`
                        ${styles.Description}
                    `}>
                    <div className={styles.TextDescription}>
                        <p id={styles.desc}>{proyecto.descripcion}</p>
                    </div>
                    <div className={styles.Categories}>
                        {proyecto.categorias.map(categoria => (
                            <div
                                className={`${styles.Category}
                                ${user.categorias.includes(categoria) ? styles.CategoryUser : ''}`}>
                                <p>{categoria}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <CategoryContent categories={totalCategorias} user={user}/>
            <div className={styles.MyProjectsPage}>
                {proyectos.map(proyecto => (
                    <div className={styles.Project}>
                        {DisplayProjectContent(proyecto)}
                    </div>
                ))}
            </div>
        </>
        
    )
}

export default MyProjectsPage;