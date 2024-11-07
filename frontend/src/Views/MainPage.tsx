import React from 'react';
import styles from '../Styles/HomePage.module.css';
import { useLocation } from 'react-router-dom';
import CategoryContent from '../Components/CategoryContent';

function MainPage(){
    //Manejamos el recibo de parámetros
    const location = useLocation();
    const user = location.state?.user; //Recibimos al usuario

    //Get categories 
    const categories = user?.categories || [];

    return (
        <div className={styles.Homepage}>
            <CategoryContent categories={categories}/>

        </div>
    )
}

export default MainPage;