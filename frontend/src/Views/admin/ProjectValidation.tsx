import React, { useEffect, useState } from 'react';
import { getProjects } from '../../ConnectionToBackend/Routes/getProjects';
import styles from '../../Styles/ValidateProject.module.css'; // Importamos el nuevo archivo de estilos

interface Proyecto {
    idProyecto: string;
    nombre: string;
    descripcion: string;
    categorias: string[];
    objetivo_financiero: number;
    fondos_recaudados: number;
    media: string[];
    nombre_creador: string;
    diasRestantes: number;
    porcentajeFundado: number;
}

const ProjectValidation = () => {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);

    useEffect(() => {
        // Función para obtener proyectos del backend
        const fetchProjects = async () => {
            try {
                const fetchedProyectos = await getProjects(); // Llamada a la API para obtener proyectos
                setProyectos(fetchedProyectos); // Guardamos los proyectos en el estado
            } catch (error) {
                console.error("Error al obtener proyectos:", error);
            }
        };
        fetchProjects();
    }, []);

    // Función para manejar la acción de aprobar un proyecto
    const handleApprove = (id: string) => {
        console.log("Proyecto aprobado:", id);
        // Aquí puedes agregar la lógica para aprobar el proyecto (por ejemplo, actualizar en la base de datos)
    };

    // Función para manejar la acción de rechazar un proyecto
    const handleReject = (id: string) => {
        console.log("Proyecto rechazado:", id);
        // Aquí puedes agregar la lógica para rechazar el proyecto (por ejemplo, actualizar en la base de datos)
    };

    return (
        <div className={styles.ProjectValidation}>
            <h2>Validación de Proyectos</h2>
            <div className={styles.ProjectList}>
                {proyectos.length > 0 ? (
                    proyectos.map((proyecto) => (
                        <div key={proyecto.idProyecto} className={styles.ProjectCard}>
                            <img src={proyecto.media[0]} alt={proyecto.nombre} className={styles.ProjectImage} />
                            <div className={styles.ProjectInfo}>
                                <h3>{proyecto.nombre}</h3>
                                <p>{proyecto.descripcion}</p>
                                <p><strong>Creado por:</strong> {proyecto.nombre_creador}</p>
                                <p><strong>Fondos Recaudados:</strong> {proyecto.fondos_recaudados} / {proyecto.objetivo_financiero}</p>
                                <p><strong>Días restantes:</strong> {proyecto.diasRestantes}</p>
                            </div>
                            <div className={styles.ProjectActions}>
                                <button onClick={() => handleApprove(proyecto.idProyecto)} className={styles.ApproveButton}>Aprobar</button>
                                <button onClick={() => handleReject(proyecto.idProyecto)} className={styles.RejectButton}>Rechazar</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay proyectos para validar.</p>
                )}
            </div>
        </div>
    );
};

export default ProjectValidation;
