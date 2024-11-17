import React, { useEffect, useState } from "react";
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import styles from '../Styles/ProjectMonitoring.module.css';
import { fetchProjects } from "../ConnectionToBackend/Routes/fetchProjects";

// Interfaz para los proyectos
interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    created_at: string;
}

function ProjectMonitoring() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        // backend
        const getProjects = async () => {
            const data = await fetchProjects();
            setProjects(data);
        };
        getProjects();
    }, []);

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