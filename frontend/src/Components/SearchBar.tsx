import React, {useEffect, useState} from 'react'
import { FaSearch } from 'react-icons/fa'
import styles from '../Styles/ComponentStyles/SearchBar.module.css'

interface SearchBarProps {
    //Acá ejerceremos la función de búsqueda
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    //Seleccionamos el tipo de búsqueda a darse
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (onSearch){
            //Indicamos que se ponga en opción buscando
            const timeout = setTimeout(() => onSearch(query), 300);
            return () => clearTimeout(timeout);
        }
    }, [query, onSearch])

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
            </div>
        </div>
    )
}
export default SearchBar;