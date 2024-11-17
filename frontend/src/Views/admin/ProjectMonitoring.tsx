import React, { useState } from "react";
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import styles from '../../Styles/ProjectMonitoring.module.css';

// Interfaz para los proyectos
interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    created_at: string;
}

function ProjectMonitoring() {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: "1",
            name: "Proyecto A",
            description: "Este es un proyecto sobre tecnología innovadora.",
            status: "En progreso",
            created_at: "2024-11-10",
        },
        {
            id: "2",
            name: "Proyecto B",
            description: "Este es un proyecto de desarrollo social.",
            status: "Finalizado",
            created_at: "2024-10-15",
        },
        {
            id: "3",
            name: "Proyecto C",
            description: "Este es un proyecto de investigación científica.",
            status: "Pendiente",
            created_at: "2024-11-01",
        },
    ]); // Datos de ejemplo

    return (
        <div className={styles.ProjectMonitoring}>
            <h1>Monitoreo de Proyectos</h1>
            <div className={styles.ProjectList}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.ProjectCard}>
                        <div className={styles.ProjectInfo}>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <p><strong>Estado:</strong> {project.status}</p>
                            <p><strong>Creado el:</strong> {new Date(project.created_at).toLocaleDateString()}</p>
                        </div>
                        <Link to={`/project/${project.id}`} className={styles.ViewDetailsBtn}>
                            <FaEye className={styles.icon} />
                            Ver Detalles
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectMonitoring;
