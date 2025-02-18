import React, {useState} from "react";
import styles from "./scss/LoadingComponent.module.scss";



const LoadingComponent: React.FC = () => {


    return (

        <div className={styles.banterLoader}>
            <div className={styles.banterLoaderBox}></div>
            <div className={styles.banterLoaderBox}></div>
            <div className={styles.banterLoaderBox}></div>
            <div className={styles.banterLoaderBox}></div>
            <div className={styles.banterLoaderBox}></div>
            <div className={styles.banterLoaderBox}></div>
            <div className={styles.banterLoaderBox}></div>
            <div className={styles.banterLoaderBox}></div>
            <div className={styles.banterLoaderBox}></div>
        </div>
    )
}

export default LoadingComponent;
