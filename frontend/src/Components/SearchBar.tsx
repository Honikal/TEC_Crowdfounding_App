import React, {useEffect, useState} from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import styles from '../Styles/ComponentStyles/SearchBar.module.css'
import { getProjects } from '../ConnectionToBackend/Routes/getProjects';
import { useNavigate } from 'react-router-dom';

interface User{
    idUsuario: string,
    nombre: string,
    activa: boolean,
    areaTrabajo: string,
    categorias: string[],
    cedula: string,
    correo: string,
    password: string,
    presupuesto: number,
    role: string,
    telefono: string
}

interface SearchBarProps {
    //Acá ejerceremos la función de búsqueda
    onSearch?: (query: string) => void;
    user: User
}

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

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, user }) => {
    //Seleccionamos el tipo de búsqueda a darse
    const [query, setQuery] = useState('');
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [proyectosFiltrados, setProyectosFiltrados] = useState<Proyecto[]>([]);
    const [selectedFilter, setSelectedFilter] = useState('nombre'); //Iniciamos con el más básico
    const [showResults, setShowResults] = useState(true);
    const navigate = useNavigate();

    //Tomamos todos los proyectos una vez montados
    useEffect(() => {
        const getProyectos = async() => {
            const fetchedProyectos = await getProjects();
            setProyectos(fetchedProyectos);
        };
        getProyectos();
    }, [])

    //Filtrar proyectos basados en query y filtro seleccionado
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query){
                //Filtramos los proyectos
                filterProjects();
                setShowResults(true);
            } else {
                setProyectosFiltrados([]);
            }
        }, 300); //Hacemos un sistema de búsqueda que espere 300ms

        return () => clearTimeout(timeout)
    }, [query, onSearch])

    //Función para filtrar proyectos
    const filterProjects = () => {
        let filtered = proyectos.filter((proyecto) => {
            switch (selectedFilter) {
                case 'nombre':
                    return proyecto.nombre.toLowerCase().includes(query.toLowerCase());
                case 'autor':
                    return proyecto.nombre_creador.toLowerCase().includes(query.toLowerCase());
                case 'presupuesto':
                    return proyecto.objetivo_financiero.toString().includes(query);
                case 'fecha':
                    return proyecto.fecha_limite.includes(query);
                default:
                    return false;
            }
        });
        setProyectosFiltrados(filtered);
    }

    //Habilidad para seleccionar el proyecto
    const handleSelectProject = (proyecto: Proyecto) => {
        navigate('/project', { state: { user: user, project: proyecto }})
    }

    //Limpiar el sistema de resultados
    const clearResults = () => {
        setProyectosFiltrados([]);
        setShowResults(false);
    };

    return (
        <div className={styles.SearchContainer}> 
            <div className={styles.SearchContainerInput}>
                <FaSearch className={styles.SearchIcon}/>
                <input
                    type='text'
                    placeholder='Buscar proyectos'
                    className={styles.SearchInput}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className={styles.ClearButton} onClick={clearResults}>
                    <FaTimes className={styles.ClearButtonIcon}/>
                </button>
                <select
                    className={styles.SearchFilter}
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                >
                    <option value="nombre">Nombre</option>
                    <option value="autor">Autor</option>
                    <option value="presupuesto">Presupuesto</option>
                    <option value="fecha">Fecha</option>
                </select>
            </div>
            {showResults && proyectosFiltrados.length === 0 && query && (
                <div className={styles.NoResults}>
                    <p>Lo sentimos</p>
                </div>
            )}

            {showResults && proyectosFiltrados.length > 0 && (
                <div className={styles.SearchResults}>
                    {proyectosFiltrados.map((proyecto) => (
                        <div
                            key={proyecto.idProyecto}
                            onClick={() => handleSelectProject(proyecto)}
                            className={styles.SearchResultItem}
                        >   
                            <img
                                src={proyecto.media[0]}
                                alt={proyecto.nombre}
                                className={styles.SearchResultImage}
                            />
                            <div className={styles.SearchResultItemDesc}>
                                <p className={styles.Title}>{proyecto.nombre}</p>
                                <p>de {proyecto.nombre_creador}</p>
                                <p>{proyecto.porcentajeFundado} donado   {proyecto.diasRestantes} días más</p>
                            </div>  
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default SearchBar;