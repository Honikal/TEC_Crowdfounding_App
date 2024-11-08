import React, {useEffect} from 'react';
import styles from '../Styles/MainPage.module.css';
import { useLocation } from 'react-router-dom';

import { useUser } from '../Components/UserContext';
import CategoryContent from '../Components/CategoryContent';

function MainPage(){
    //Manejamos el recibo de parámetros
    const location = useLocation();
    const { setUser } = useUser();
    const user = location.state?.user; //Recibimos al usuario

    useEffect(() => {
        //Asumimos que obtenemos los datos del usuario de otro modo
        const userData = location.state?.user;
        if (userData){
            setUser(userData)
        }
    }, [location, setUser])

    console.log("Usuario recibido: ", user);

    //Get categories 
    const categories = user.categorias || [];

    return (
        <>
            <CategoryContent categories={categories}/>
            <div className={styles.Mainpage}>

            </div>
        </>
        
    )
}

export default MainPage;