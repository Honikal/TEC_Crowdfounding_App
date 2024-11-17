import React, { useState, useEffect } from "react";
import styles from '../../Styles/EventConfiguration.module.css';

type Event = {
    id: string;
    title: string;
    description: string;
    date: string;
    attendees: string[];
    materials: File[];
};

const EventConfiguration: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [newEvent, setNewEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(false);

    // Función para manejar la creación de un nuevo evento
    const handleCreateEvent = () => {
        if (newEvent) {
            setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
            setNewEvent(null);
            alert("Evento creado exitosamente");
        }
    };

    // Función para manejar la edición de un evento existente
    const handleEditEvent = (id: string) => {
        const eventToEdit = events.find(event => event.id === id);
        if (eventToEdit) setNewEvent(eventToEdit);
    };

    // Función para guardar los cambios de un evento editado
    const handleSaveEvent = () => {
        setEvents(events.map(event => (event.id === newEvent?.id ? newEvent : event)));
        setNewEvent(null);
        alert("Evento actualizado exitosamente");
    };

    // Función para añadir asistentes al evento
    const handleAddAttendee = (attendee: string) => {
        if (newEvent) {
            setNewEvent({
                ...newEvent,
                attendees: [...newEvent.attendees, attendee],
            });
        }
    };

    // Función para manejar la subida de materiales
    const handleUploadMaterials = (files: FileList | null) => {
        if (files && newEvent) {
            const uploadedMaterials = Array.from(files);
            setNewEvent({
                ...newEvent,
                materials: [...newEvent.materials, ...uploadedMaterials],
            });
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Configuración de Eventos</h1>

            {/* Formulario para crear o editar un evento */}
            <div className={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Título del Evento"
                    value={newEvent?.title || ""}
                    onChange={(e) => setNewEvent({ ...newEvent!, title: e.target.value })}
                    className={styles.input}
                />
                <textarea
                    placeholder="Descripción"
                    value={newEvent?.description || ""}
                    onChange={(e) => setNewEvent({ ...newEvent!, description: e.target.value })}
                    className={styles.textarea}
                />
                <input
                    type="date"
                    value={newEvent?.date || ""}
                    onChange={(e) => setNewEvent({ ...newEvent!, date: e.target.value })}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Añadir Asistente"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                            handleAddAttendee(e.currentTarget.value);
                            e.currentTarget.value = "";
                        }
                    }}
                    className={styles.input}
                />
                <input
                    type="file"
                    multiple
                    onChange={(e) => handleUploadMaterials(e.target.files)}
                    className={styles.input}
                />
                {newEvent ? (
                    <button onClick={handleSaveEvent} className={styles.saveButton}>Guardar Cambios</button>
                ) : (
                    <button onClick={handleCreateEvent} className={styles.createButton}>Crear Evento</button>
                )}
            </div>

            {/* Listado de eventos */}
            <div className={styles.eventList}>
                {events.map((event) => (
                    <div key={event.id} className={styles.eventContainer}>
                        <h2 className={styles.eventTitle}>{event.title}</h2>
                        <p className={styles.eventDescription}>{event.description}</p>
                        <p className={styles.eventDate}>Fecha: {event.date}</p>
                        <p className={styles.eventAttendees}>Asistentes: {event.attendees.join(", ")}</p>
                        <p className={styles.eventMaterials}>Materiales: {event.materials.map(file => file.name).join(", ")}</p>
                        <button onClick={() => handleEditEvent(event.id)} className={styles.editButton}>Editar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventConfiguration;
