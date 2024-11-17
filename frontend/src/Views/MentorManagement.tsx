import React, { useEffect, useState } from "react";
import styles from '../Styles/MentorManagement.module.css';
import { fetchMentors } from "../ConnectionToBackend/Routes/fetchMentors";

// Interfaz para los mentores
interface Mentor {
    id: string;
    name: string;
    email: string;
    role: string;
}

function MentorManagement() {
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [newMentor, setNewMentor] = useState({ name: "", email: "", role: "" });

    useEffect(() => {
        // Obtener lista de mentores
        const getMentors = async () => {
            const data = await fetchMentors();
            setMentors(data);
        };
        getMentors();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewMentor({ ...newMentor, [name]: value });
    };

    const handleRegisterMentor = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí podrías añadir la lógica para enviar el nuevo mentor al backend
        setMentors([...mentors, { id: Date.now().toString(), ...newMentor }]);
        setNewMentor({ name: "", email: "", role: "" });
    };

    return (
        <div className={styles.MentorManagement}>
            <h1>Registro y Gestión de Mentores</h1>
            <section className={styles.RegisterSection}>
                <h2>Registrar Nuevo Mentor</h2>
                <form onSubmit={handleRegisterMentor} className={styles.MentorForm}>
                    <label>Nombre:
                        <input
                            type="text"
                            name="name"
                            value={newMentor.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>Correo Electrónico:
                        <input
                            type="email"
                            name="email"
                            value={newMentor.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>Rol de Mentoría:
                        <select
                            name="role"
                            value={newMentor.role}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Selecciona un rol</option>
                            <option value="Liderazgo">Liderazgo</option>
                            <option value="Tecnología">Tecnología</option>
                            <option value="Desarrollo Personal">Desarrollo Personal</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </label>
                    <button type="submit">Registrar Mentor</button>
                </form>
            </section>
            <section className={styles.MentorListSection}>
                <h2>Lista de Mentores</h2>
                <table className={styles.MentorTable}>
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol de Mentoría</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mentors.map((mentor) => (
                        <tr key={mentor.id}>
                            <td>{mentor.name}</td>
                            <td>{mentor.email}</td>
                            <td>{mentor.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default MentorManagement;