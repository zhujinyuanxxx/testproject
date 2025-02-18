import React, {useRef} from "react";
import styles from "./scss/HomeViewMainPageRightSideForMobileComponent.module.scss";
import InputComponent from "./InputComponent";
import FriendListComponent from "./FriendListComponent";


interface HomeViewMainPageRightSideForMobileComponentProps {

    name?: string;
    onclick?: ()=>void;

}

const HomeViewMainPageRightSideForMobileComponent: React.FC<HomeViewMainPageRightSideForMobileComponentProps> = ({name,onclick}) => {


    const mainPageRightSideForMobileRef = useRef<HTMLDivElement | null>(null);

    // const mainPageSideForMobileRef = useRef<HTMLDivElement | null>(null);


    const hideMainPageRightSideForMobile = () => {
        if (mainPageRightSideForMobileRef.current) {
            mainPageRightSideForMobileRef.current.style.right = "-100%";
        }
    };


    return (

        <div className={styles.mainPageRightSideForMobile} ref={mainPageRightSideForMobileRef}>
            <div className={styles.mainPageRightSideCloseBtn} onClick={hideMainPageRightSideForMobile}>
                X
            </div>
            <div className={styles.mainPageRightSideSearchBox}>
                <InputComponent/>
            </div>
            <div className={styles.mainPageRightSideFriendList}>
                <FriendListComponent enableClickEffect={false}/>
            </div>
        </div>

    );

};

export default HomeViewMainPageRightSideForMobileComponent;