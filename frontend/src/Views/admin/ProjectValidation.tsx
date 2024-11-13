import React, { useState, useEffect } from "react";
import styles from '../../Styles/ProjectValidation.module.css';

type Project = {
    id: string;
    name: string;
    description: string;
    submittedBy: string;
    isApproved: boolean | null;
};

const ProjectValidation: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Simulación de carga de proyectos
    useEffect(() => {
        const proyectosEjemplo: Project[] = [
            { id: "1", name: "Proyecto A", description: "Descripción del Proyecto A", submittedBy: "Juan Pérez", isApproved: null },
            { id: "2", name: "Proyecto B", description: "Descripción del Proyecto B", submittedBy: "María López", isApproved: null },
            { id: "3", name: "Proyecto C", description: "Descripción del Proyecto C", submittedBy: "Carlos Ramírez", isApproved: null },
        ];
        setTimeout(() => {
            setProjects(proyectosEjemplo);
            setLoading(false);
        }, 1000);
    }, []);

    // Función para aprobar o rechazar un proyecto
    const handleApproval = (id: string, isApproved: boolean) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === id ? { ...project, isApproved } : project
            )
        );
        alert(`Proyecto ${isApproved ? "aprobado" : "rechazado"} con éxito.`);
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Cargando proyectos...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Validación de Proyectos</h1>
            <div className={styles.projectList}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.projectContainer}>
                        <h2 className={styles.projectName}>{project.name}</h2>
                        <p className={styles.projectDescription}>{project.description}</p>
                        <p className={styles.submittedBy}>Propuesto por: {project.submittedBy}</p>
                        <div className={styles.buttonContainer}>
                            <button
                                className={`${styles.approveButton} ${project.isApproved === true ? styles.disabled : ''}`}
                                onClick={() => handleApproval(project.id, true)}
                                disabled={project.isApproved !== null}
                            >
                                Aprobar
                            </button>
                            <button
                                className={`${styles.rejectButton} ${project.isApproved === false ? styles.disabled : ''}`}
                                onClick={() => handleApproval(project.id, false)}
                                disabled={project.isApproved !== null}
                            >
                                Rechazar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectValidation;
