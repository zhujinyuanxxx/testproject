import React from "react";
import styles from "./scss/CardsComponent.module.scss";


interface CardsComponentProps {

    name?: string;
    onclick?: ()=>void;

}

const CardsComponent: React.FC<CardsComponentProps> = ({name,onclick}) => {

    return (

        <div className={styles.card}>
            <div className={`${styles.item} ${styles.item1}`}>
                <span className={styles.quantity}> Files Module </span>
                <span className={styles.text}> AES EN/DECRYPTION </span>
            </div>
            <div className={`${styles.item} ${styles.item2}`}>
                <span className={styles.quantity}> Permissions </span>
                <span className={styles.text}> Dual Token </span>
            </div>
            <div className={`${styles.item} ${styles.item3}`}>
                <span className={styles.quantity}> Nginx </span>
                <span className={styles.text}> Load Balance </span>
            </div>
            <div className={`${styles.item} ${styles.item4}`}>
                <span className={styles.quantity}> Git Action </span>
                <span className={styles.text}> CI/CD </span>
            </div>
        </div>

    );

};

export default CardsComponent;