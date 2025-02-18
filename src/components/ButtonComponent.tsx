import React from "react";
import styles from "./scss/ButtonComponent.module.scss";


interface ButtonComponentProps {

    name?: string;
    onclick?: ()=>void;

}

const ButtonComponent: React.FC<ButtonComponentProps> = ({name,onclick}) => {

    return (

        <button onClick={onclick}>
            <span className={styles.button_top}> {name} </span>
        </button>

    );

};

export default ButtonComponent;