import React from "react";
import styles from "./scss/ProgressBarComponent.module.scss";


interface ProgressBarComponentProps {

    className?: string;
    width?: number;
    progress?: number;
    visible?: boolean;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({width,progress,visible}) => {


    return (
        <div className={`${styles.Overlay} ${visible ? styles.visible : ''}`}>
            <div className={styles.Loader}>
                <div className={styles.Progress} style={{ width: `${progress}%` }} data-percentage={`${progress}%`}></div>
            </div>
        </div>
    );


};

export default ProgressBarComponent;