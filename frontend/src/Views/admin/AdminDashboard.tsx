import React, { useEffect, useState } from "react";
import { FaProjectDiagram, FaDonate, FaUserFriends } from 'react-icons/fa';

import styles from '../../Styles/AdminDashboard.module.css';

// Interfaz para las estadísticas del dashboard
interface DashboardStats {
    projects: number;
    donations: number;
    activeUsers: number;
}

function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({ projects: 0, donations: 0, activeUsers: 0 });

    useEffect(() => {
        // Simular datos de ejemplo para el frontend
        const getExampleData = () => {
            const exampleData: DashboardStats = {
                projects: 123,
                donations: 4567,
                activeUsers: 789,
            };
            setStats(exampleData);
        };
        getExampleData();
    }, []);

    return (
        <div className={styles.AdminDashboard}>
            <h1>Panel de Administración</h1>
            <div className={styles.StatsContainer}>
                <div className={styles.StatCard}>
                    <FaProjectDiagram className={styles.icon} />
                    <h2>{stats.projects}</h2>
                    <p>Proyectos</p>
                </div>
                <div className={styles.StatCard}>
                    <FaDonate className={styles.icon} />
                    <h2>{stats.donations}</h2>
                    <p>Donaciones</p>
                </div>
                <div className={styles.StatCard}>
                    <FaUserFriends className={styles.icon} />
                    <h2>{stats.activeUsers}</h2>
                    <p>Usuarios Activos</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
