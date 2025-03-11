import React, {useEffect, useMemo, useState} from 'react';
import styles from "../scss/Home/Profile.module.scss";

const Profile: React.FC = () => {


    return (

        <div className={styles.profile}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.front}>
                        <div className={styles.cardTop}>
                            <p className={styles.cardTopPara}>Profile</p>
                        </div>
                        <div className={styles.avatar}>
                            {/*Avatar*/}
                        </div>
                        <p className={styles.heading}> Front Card </p>
                        <p className={styles.follow}>Follow me for more...</p>
                    </div>



                    <div className={styles.back}>
                        <p className={styles.heading}>Follow Me</p>
                    </div>
                </div>
            </div>
        </div>


    );

};

export default Profile;