import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import styles from '../Styles/CategoryContent.module.css'
import { useAuth } from './AuthContext'
import React, { useRef, useState } from 'react';

interface CategoryContentProps{
    categories: string[];
}

function CategoryContent( { categories }: CategoryContentProps){
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (containerRef.current){
            containerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
            setScrollPosition(containerRef.current.scrollLeft);
        }
    }   

    const scrollRight = () => {
        if (containerRef.current){
            containerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
            setScrollPosition(containerRef.current.scrollLeft);
        }
    }

    return (
        <div className={styles.HeaderContainer}>
            {scrollPosition > 0 && (
                <button className={styles.Scrollbutton} onClick={scrollLeft}>
                    <FaAngleLeft className={styles.ScrollIcon}/>
                </button>
            )}
            <div className={styles.categoriesContainer} ref={containerRef}>
                {categories.map((category, index) => (
                    <div key={index} className={styles.categoryButton}>
                        {category}
                    </div>
                ))}
            </div>
            <button className={styles.Scrollbutton} onClick={scrollRight}>
                <FaAngleRight className={styles.ScrollIcon}/>
            </button>
            
        </div>
    )
}

export default CategoryContent;