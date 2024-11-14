import React, {useEffect, useState, ChangeEvent} from 'react';
import styles from '../Styles/NewProyectoPage.module.css';
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { IoCalendarOutline, IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'
import { createProject } from '../ConnectionToBackend/Routes/createProject';
import { useLocation, useNavigate } from 'react-router-dom';

interface Proyecto {
    id_creador: string,
    activa: boolean,
    nombre: string,
    descripcion: string,
    categorias: string[],
    fecha_creacion: string,
    fecha_limite: string,
    fondos_recaudados: number,
    objetivo_financiero: number,
    media: string[]
}

function NewProjectPage() {
    //Activamos la navegacion y extracción de parámetros
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user; //Recibimos al usuario

    //Manejamos el máximo de imágenes a usar
    const maxMedia = 8;

    //Estado para el formulario por pasos
    const [currentSteps, setCurrentSteps] = useState<number>(1);
    const totalSteps = 5;
    

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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

    const convertirDateToString = (date: any) => {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();

        return `${day}/${month}/${year}`;
    }
    
    const parseDateString = (dateStr: string): string => {
        const parts = dateStr.split('-');
        if (parts.length === 3){
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        throw new Error('Dato inválido de fecha');
    }

    const [proyecto, setProyecto] = useState<Proyecto>({
        id_creador: user.idUsuario,
        activa: true,
        nombre: "",
        descripcion: "",
        categorias: [],
        fecha_creacion: convertirDateToString(new Date()),
        fecha_limite: "",
        objetivo_financiero: 0.00,
        fondos_recaudados: 0.00,
        media: []
    })

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
                                value={proyecto.fecha_limite}
                                onChange={handleProyectoChange}
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
                        {/*Manejo de las imágenes*/}
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
                                    {proyecto.media.slice(currentIndex, currentIndex + maxMedia).map((src, index) => (
                                        <div key={index} className={styles.previewItem} onClick={() => handleRemoveMedia(index)}>
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
                                    ))}
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
            //Validamos o parseamos los datos
            const validUserData = {
                ...proyecto,
                objetivo_financiero: Number(proyecto.objetivo_financiero),
                fecha_limite: parseDateString(proyecto.fecha_limite),
                categorias: selectedCategories
            };

            console.log("dato validado: ", validUserData);
            const projecto = await createProject(user, validUserData);
            console.log("Proyecto creado: ", projecto);
            alert("Proyecto creado de forma exitosa");
            navigate("/main-page", { state: {user: user } })
        }
        
    }


    return (
        <div className={styles.NewProyectoPage}>
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
                        <p>Crear Proyecto</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewProjectPage;