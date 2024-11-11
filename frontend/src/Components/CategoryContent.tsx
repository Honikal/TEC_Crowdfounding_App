import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import styles from '../Styles/CategoryContent.module.css'
import React, { useEffect, useRef, useState } from 'react';

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

interface CategoryContentProps{
    categories: string[];
    user: User
}

function CategoryContent( { categories, user }: CategoryContentProps){
    //Seteamos valores y funciones para chequear caso de overflowing
    const [scrollPosition, setScrollPosition] = useState(0);

    const [isOverflowing, setIsOverflowing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const checkOverflow = () => {
        const container = containerRef.current;
        if (container){
            setIsOverflowing(container.scrollWidth > container.clientWidth);
        }
    };

    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [categories]);

    /*Lo que hacemos acá, es obtener el posible parse int del sistema, un valor de distancia de scroll
    desde el CSS, checando de forma responsive, y mediante ésto checamos y hacemos que el scroll también sea responsive*/

    const scrollLeft = () => {
        const scrollDistance = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--scroll-distance'));
        if (containerRef.current){
            containerRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
        }
    }   

    const scrollRight = () => {
        const scrollDistance = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--scroll-distance'));
        if (containerRef.current){
            containerRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        }
    }

    const navigateToSection = (category: string) => {
        
        navigate("/search/categories", {
            state: { category, user }
        });
    }

    return (
        <div className={`${styles.HeaderContainer} ${isOverflowing ? styles.overflowing : ''}`}>
            {isOverflowing  && (
                <button className={styles.Scrollbutton} onClick={scrollLeft}>
                    <FaAngleLeft className={styles.ScrollIcon}/>
                </button>
            )}

            <div className={`${styles.categoriesContainer} ${!isOverflowing ? styles.spaceBetween : ''}`}
                ref={containerRef}
            >
                {categories.map((category, index) => (
                    <div key={index} className={styles.categoryButton} onClick={() => navigateToSection(category)}>
                        {category}
                    </div>
                ))}
            </div>

            {
                isOverflowing && (
                    <button className={styles.Scrollbutton} onClick={scrollRight}>
                        <FaAngleRight className={styles.ScrollIcon}/>
                    </button>
                )
            }
        </div>
    )
}

export default CategoryContent;