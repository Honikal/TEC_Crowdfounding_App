import React, { useState, ChangeEvent} from 'react';
import styles from '../Styles/ModifyProjectPage.module.css';
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { IoCalendarOutline, IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom';
import { modifyProject } from '../ConnectionToBackend/Routes/modifyProject';
import LoadingModal from '../Components/LoadingModal';

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

function ModifyProjectPage() {
    //Activamos la navegacion y extracción de parámetros
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user; //Recibimos al usuario
    const initialProject = location.state?.project as Proyecto;

    //Manejamos el máximo de imágenes a usar
    const maxMedia = 8;

    //Estado para el formulario por pasos
    const [currentSteps, setCurrentSteps] = useState<number>(1);
    const totalSteps = 5;
    
    //El valor base del proyecto
    const [proyecto, setProyecto] = useState<Proyecto>({
        idProyecto: initialProject.idProyecto,
        id_creador: initialProject.id_creador,
        activa: true,
        nombre: initialProject.nombre,
        descripcion: initialProject.descripcion,
        categorias: initialProject.categorias,
        fecha_creacion: initialProject.fecha_creacion,
        fecha_limite: initialProject.fecha_limite,
        fondos_recaudados: initialProject.fondos_recaudados,
        objetivo_financiero: initialProject.objetivo_financiero,
        media: initialProject.media,

        nombre_creador: initialProject.nombre_creador,
        diasRestantes: initialProject.diasRestantes,
        porcentajeFundado: initialProject.porcentajeFundado
    })

    //Sistema de carga de la página como tal
    const [loading, setLoading] = useState(false);

    //El valor 
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialProject.categorias);
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
    ]);

    //Función encargada de convertir los datos a date
    const formatDateForInput = (fecha: string): string => {
        const [dia, mes, año] = fecha.split('/');
        return `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
    }

    //Función encargada de convertir los datos 'dd-mm-yyyy' al formato a guardar
    const formatDateForSave = (dateStr: string): string => {
        const parts = dateStr.split('-');
        if (parts.length === 3){
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        throw new Error('Dato inválido de fecha');
    }


    //Para el carousel navigation (de las imágenes)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorMessages, setErrorMessages] = useState<{[key: string]: string}>({});

    

    //Función encargada de controlar el struct esperado para recibir datos de entrada del usuario
    const handleProyectoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setProyecto(prev => ({
            ...prev,
            [name]: value
        }));
        //Hacemos función para validación dinámica
        //validateInput(e.target.name, e.target.value);
        validateInput(name, value);
    }

    //Función encargada del formateo de tipos de date
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fechaActualizada = formatDateForSave(value);

        //Creamos un evento custom a pasar al eventChange
        const customEvent = {
            target: {name, value: fechaActualizada }
        } as ChangeEvent<HTMLInputElement>

        handleProyectoChange(customEvent);
    } 

    //Manejar la carga de medios
    const handleMediaUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            handleFileSelection(files);
        }
    }
    //Manejar arrestrar medios
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files){
            handleFileSelection(files)
        }
    }
    const handleFileSelection = (files: FileList) => {
        /*Tenemos que convertir los links recibidos
        blob:http://localhost:3000/e954e51a-bd3c-4674-8411-6bb71ee766b2

        en una versión que sea base64 String, para poder subir los datos al sistema o backend
        */
        const filesArray = Array.from(files).map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    //Convertimos a un string de 64 bits
                    const result = reader.result as string;
                    resolve(result);
                }
                reader.onerror = reject;
                //Convertimos el archivo en base 64 bits
                reader.readAsDataURL(file);
            });
        });

        Promise.all(filesArray)
            .then((base64strings) => {
                //Guardamos el array de strings de url en 64 bits
                setProyecto(prev => ({
                    ...prev,
                    media: [...prev.media, ...base64strings].slice(0, maxMedia) 
                }))
            })
    }

    //Manejar quitar imágenes de la lista
    const handleRemoveMedia = (index: number) => {
        setProyecto(prev => ({
            ...prev,
            media: prev.media.filter((_, i) => i !== index)
        }));
    }

    //Manejar el dragging de imágenes para orden
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData('mediaIndex', index.toString())
    }
    const handleDropReorder = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        const oldIndex = parseInt(e.dataTransfer.getData('mediaIndex'), 10);

        setProyecto((prev) => {
            const mediaReordenada = [...prev.media];
            const [movedItem] = mediaReordenada.splice(oldIndex, 1); //Removemos el item tomado
            mediaReordenada.splice(index, 0, movedItem); //Tomamos dicho objeto y lo cambiamos de lado
        
            return {
                ...prev,
                media: mediaReordenada
            }
        })
    }

    //Manejar la selección de categorías
    const handleCategoryClick = (categoria: string) => {
        const newCategories = selectedCategories.includes(categoria)
            ? selectedCategories.filter(c => c !== categoria)
            : [...selectedCategories, categoria]
        console.log("Lista categorias anteriores: ", selectedCategories);
        setSelectedCategories(newCategories);
    }

    //Funciones para navegar entre pasos
    const nextStep = () => setCurrentSteps(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentSteps(prev => Math.max(prev - 1, 1));

    //Finalmente, manejo de la página de renderización
    const renderProjectContent = () => {
        switch (currentSteps) {
            case 1: return (
                <div className={styles.ProyectoContent}>
                    <div className={styles.Indications}> 
                        <h2>Categoría del Proyecto</h2>
                        <p>Escoge categorias de importancia para facilitar la búsqueda e interés de tu proyector por proveedores</p>
                    </div>
                    <div className={styles.InputContainer}>
                        <div className={styles.Categories}>
                            {totalCategorias.map(categoria => (
                                <div
                                    className={`${styles.Category} ${selectedCategories.includes(categoria) ? styles.Selected : ''}`}
                                    onClick={() => handleCategoryClick(categoria)}
                                >
                                    <p>{categoria}</p>
                                </div>
                            ))}
                        </div>
                        {errorMessages.categorias && <p className={styles.errorMessage}>{errorMessages.categorias}</p>}
                    </div>
                </div>
            )
            case 2: return (
                <div className={styles.ProyectoContent}>
                    <div className={styles.Indications}> 
                        <h2>Título del Proyecto y descripción</h2>
                        <p>Crea un título conciso para ayudar a las personas a rápidamente entender tu proyecto</p>
                        <p>Proveedores potenciales también verán éste título si tu proyecto aparece en recomendados, o como destacado incluso</p>
                    </div>
                    <div className={styles.InputContainer}>
                        <h3>Nombre del Proyecto</h3>
                        <div className={styles.InputSection}>
                            <input
                                type='text'
                                name="nombre"
                                placeholder='nombre del proyecto'
                                value={proyecto.nombre}
                                onChange={handleProyectoChange}
                            />
                            {errorMessages.nombre && <p className={styles.errorMessage}>{errorMessages.nombre}</p>}
                        </div>
                        <h3>Descripción del Proyeto</h3>
                        <div className={styles.InputSection}>
                            <textarea
                                className={styles.textarea}
                                name="descripcion"
                                placeholder="descripción del proyecto"
                                value={proyecto.descripcion}
                                onChange={handleProyectoChange}
                            />
                            {errorMessages.descripcion && <p className={styles.errorMessage}>{errorMessages.descripcion}</p>}
                        </div>
                    </div>
                </div>
            )
            case 3: return (
                <div className={styles.ProyectoContent}>
                    <div className={styles.Indications}> 
                        <h2>Meta de financiamiento</h2>
                        <p>Asigna una meta realística que cubra al completo lo que necesites en tu proyecto</p>
                        <p>Las ganancias financiadas son todo o nada, de modo que si no alcanzas la meta, no recibirás el dinero</p>
                    </div>
                    <div className={styles.InputContainer}>
                        <h3>Objetivo financiero</h3>
                        <div className={styles.InputSection}>
                            <input
                                type='number'
                                name="objetivo_financiero"
                                placeholder='0.00$'
                                value={proyecto.objetivo_financiero}
                                onChange={handleProyectoChange}
                            />
                        </div>
                        {errorMessages.objetivo_financiero && <p className={styles.errorMessage}>{errorMessages.objetivo_financiero}</p>}
                    </div>
                </div>
            )
            case 4: return (
                <div className={styles.ProyectoContent}>
                    <div className={styles.Indications}> 
                        <h2>Duración de la campaña</h2>
                        <p>Asigna un tiempo límite a tu campaña. Una vez asignada una fecha, no serás capaz de cambiarla</p>
                    </div>
                    <div className={styles.InputContainer}>
                        <h3>Fecha de terminación</h3>
                        <div className={styles.InputSection}>
                            <input
                                type='date'
                                name="fecha_limite"
                                value={formatDateForInput(proyecto.fecha_limite)}
                                onChange={(e) => handleDateChange(e)}
                            />
                        </div>
                        <IoCalendarOutline className={styles.icon}/>
                    </div>
                </div>
            )
            case 5: return (
                <div className={styles.ProyectoContent}>
                    <div className={styles.Indications}> 
                        <h2>Archivos multimedia</h2>
                        <p>Incluye imágenes claras que representan tu proyecto.</p>
                        <p>Puedes subir imágenes vídeos que ofrezca una visión general de tu proyecto.</p>
                    </div>
                    <div className={styles.InputContainer}>
                        {/*Manejo de las imágenes mediante Drag and Drop*/}
                        <div
                            className={styles.mediaGetter}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            <input
                                type='file'
                                multiple
                                accept='image/*,video/*'
                                className={styles.mediaButton}
                                onChange={handleMediaUpload}
                            />
                            <p className={styles.placeholderText}>
                                Arrastra una imagen o vídeo aquí o selecciona un archivo
                            </p>
                        </div>

                        {/*Vista previa de las imágenes*/}
                        {proyecto.media.length > 0 && (
                            <div className={styles.mediaDisplayer}>
                                {currentIndex > 0 && (
                                    <button
                                        className={styles.arrowButton}
                                        onClick={() => setCurrentIndex(currentIndex-1)}
                                    >
                                        <IoArrowBackOutline/>
                                    </button>
                                )}

                                <div className={styles.mediaSection}>
                                    {proyecto.media
                                        .slice(currentIndex, currentIndex + maxMedia)
                                        .map((src, index) => {
                                            const indexAbsoluta = currentIndex + index;
                                            return (
                                                <div
                                                    key={index}
                                                    className={styles.previewItem}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, indexAbsoluta)}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => handleDropReorder(e, indexAbsoluta)}
                                                    onClick={() => handleRemoveMedia(index)}
                                                >
                                                    {src.includes('video') ? (
                                                        <video
                                                            src={src}
                                                            className={styles.previewVideo}
                                                            controls
                                                            onMouseOver={(e) => e.currentTarget.play()}
                                                            onMouseOut={(e) => e.currentTarget.pause()}
                                                            muted
                                                            preload='metadata'
                                                        />
                                                    ) : (
                                                        <img
                                                            src={src}
                                                            alt={`preview-${index}`}
                                                            className={styles.previewImage}
                                                        />
                                                    )}
                                                </div>
                                            )
                                    })}
                                </div>

                                {currentIndex + 3 < proyecto.media.length && (
                                    <button className={styles.arrowButton} onClick={() => setCurrentIndex(currentIndex + 1)}>
                                        <IoArrowForwardOutline/>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )
            default: return null;
        }
    }

    //Funciones finales de validación
    const validateInput = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "nombre":
                if (!value.trim()) error = "El nombre del proyecto es obligatorio.";
                break;
            case "descripcion":
                if (!value.trim()) error = "La descripción del proyecto es obligatoria.";
                break;
            case "objetivo_financiero":
                if (Number.isNaN(value) || parseFloat(value) < 0){
                    error = "El objetivo financiero ser un número positivo.";
                }
                break;
            case "fecha_limite":
                if (!value) error = "La fecha límite es obligatoria."; 
                break;
            case "media":
                if (proyecto.media.length === 0) error = "Debes subir al menos una imagen o video.";
                break;
            default:
                break;
        }

        setErrorMessages(prevErrors => ({ ...prevErrors, [name]: error }));
    }

    const validateCreateProject = async() => {
        const hasErrors = Object.values(errorMessages).some(message => message !== "");
        if (hasErrors){
            alert("Corrige los errores antes de continuar");
            return;
        }

        const requiredFields = ["nombre", "descripcion", "fecha_limite", "objetivo_financiero", "media"];
        let formIsValid = true;
        //Ahora hacemos la validación de forma normal
        requiredFields.forEach(field => {
            const value = proyecto[field as keyof Proyecto];
            if (!value || (Array.isArray(value) && value.length === 0)){
                setErrorMessages(prevErrors => ({
                    ...prevErrors,
                    [field]: "Éste campo es obligatorio"
                }));
                formIsValid = false;
            }
        });

        if (selectedCategories.length === 0){
            setErrorMessages(prevErrors => ({
                ...prevErrors,
                categorias: "Debes seleccionar al menos una categoría"
            }));
            formIsValid = false;
        }

        if (formIsValid){
            //Iniciamos seteando el sistema de carga
            setLoading(true);
            try {
                //Validamos o parseamos los datos
                const validUserData = {
                    ...proyecto,
                    objetivo_financiero: Number(proyecto.objetivo_financiero),
                    fecha_limite: proyecto.fecha_limite,
                    categorias: selectedCategories
                };

                console.log("dato validado: ", validUserData);

                const project = await modifyProject(validUserData)
                
                //En éste momento el sistema ya cargó el proyecto
                setLoading(false);

                alert("Modificación realizada de forma exitosa");
                //Modificamos los datos del proyecto
                proyecto.categorias = selectedCategories;

                navigate("/project", { replace: true, state: {user: user, project: proyecto } })
            } catch (error) {
                console.error("Error modificando el proyecto: ", error);
                alert("Ocurrió un error al modificar el proyecto. Inténtalo de nuevo");
            } finally {
                setLoading(false);
            }
        }
        
    }

    return (
        <div className={styles.NewProyectoPage}>
            {/*Modal de loading*/}
            <LoadingModal isVisible={loading} message="Modificando el proyecto..."/>

            <div className={styles.StepIndicator}>
                <p>Paso {currentSteps} de {totalSteps}</p>
            </div>

            <div className={styles.StepContentContainer}>
                {renderProjectContent()}
            </div>
            <div className={styles.StepButtonsContainer}>
                {/* Paso anterior*/}
                <div
                className={`
                    ${styles.StepButtons}
                    ${styles.StepButtonsBackward}
                    ${currentSteps === 1 ? styles.Disabled : ''}
                `}
                onClick={currentSteps > 1 ? prevStep : undefined}>
                    {currentSteps !== 1 && (
                        <FaLongArrowAltLeft className={styles.icon}/>
                    )}
                    <p>{currentSteps === 1 ? 'Tu primer proyecto, ¡felicidades!' : 'Paso anterior'}</p>
                </div>

                {currentSteps < totalSteps ? (
                    <div className={`${styles.StepButtons} ${styles.StepButtonsForward}`} onClick={nextStep}>
                        <p>Siguiente</p>
                    </div>
                ) : (
                    <div className={`${styles.StepButtons} ${styles.StepButtonsForward}`} onClick={validateCreateProject}>
                        <p>Editar Proyecto</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ModifyProjectPage;