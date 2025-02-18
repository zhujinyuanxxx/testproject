import React from "react";
import styles from "./scss/Button2Component.module.scss";


interface Button2ComponentProps {

    name?: string;
    onclick?: ()=>void;

}

const Button2Component: React.FC<Button2ComponentProps> = ({name,onclick}) => {

    return (

        <button className={styles.btnClassName} onClick={onclick}>
            <span className={styles.back}></span>
            <span className={styles.front}>{name}</span>
        </button>

    );

};

export default Button2Component;