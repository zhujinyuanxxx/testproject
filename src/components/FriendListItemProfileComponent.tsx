import styles from "./scss/FriendListItemProfileComponent.module.scss";
import {LegacyRef} from "react";
import ProgressBarComponent from "./ProgressBarComponent";
import {FriendItem} from "./FriendListComponent";
import LoadingComponent from "./LoadingComponent";
import Menu2Component from "./Menu2Component";

export interface FriendListItemProfileComponentProps {

    width?: string;
    height?: string;
    detailRef?:  LegacyRef<HTMLDivElement> | undefined;
    itemDetail?: FriendItem;
}


const FriendListItemProfileComponent: React.FC<FriendListItemProfileComponentProps> = ({ height,width,detailRef,itemDetail}) => {

    // const detailRef = useRef<HTMLDivElement | null>(null);


    return (

        <div className={styles.Card} ref={detailRef}>
            <div className={styles.Image}></div>
            <div className={styles.CardInfo}>
                <span>{ itemDetail ? itemDetail.username:"" }</span>
                {/*<p>{ itemDetail ? itemDetail.sex:"" }</p>*/}
                {/*<p>{ itemDetail ? itemDetail.age:"" }</p>*/}
                {/*<p>{ itemDetail ? itemDetail.telephone:"" }</p>*/}
                {/*<p>{ itemDetail ? itemDetail.email:"" }</p>*/}
            </div>
            <a href="#" className={styles.Button}>Folow</a>

        </div>



    );
};

export default FriendListItemProfileComponent;
