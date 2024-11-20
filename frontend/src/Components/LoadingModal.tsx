import React from 'react';
import styles from '../Styles/ComponentStyles/LoadingModal.module.css';

interface LoadingModalProps {
    isVisible: boolean,
    message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible, message = "Cargando..." }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.Overlay}>
            <div className={styles.Modal}>
                <div className={styles.Spinner}></div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default LoadingModal;