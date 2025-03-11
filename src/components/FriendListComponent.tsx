import styles from "./scss/FriendListComponent.module.scss";
import testAvatat from '../logo.svg';
import {useEffect, useRef, useState} from "react";
import useFriendListStore from "../zustandstore/FriendListStore";
import FriendListItemProfileComponent from "./FriendListItemProfileComponent";

export interface FriendItem {
    icon?: string;
    id?: number,
    username?: string,
    email?: string,
    age?: number,
    sex?: string,
    telephone?: string,
}

export interface FriendListProps {
    items?: FriendItem[];
    // onClick: (item: FriendItem) => void;
    width?: string;
    height?: string;
    enableClickEffect?: boolean;
}

// style={{width: width?width:0}}
const FriendListComponent: React.FC<FriendListProps> = ({ items, height,width,enableClickEffect}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const friendList = useFriendListStore(state => state.friendList);
    const selectedFriendNameList = useFriendListStore(state => state.selectedFriendNameList);
    const setSelectedFriendNameList = useFriendListStore(state => state.setSelectedFriendNameList);
    const addSelectedFriendName = useFriendListStore(state => state.addSelectedFriendName);
    const toggleSelectedFriendName = useFriendListStore(state => state.toggleSelectedFriendName);
    const detailRef = useRef<HTMLDivElement | null>(null);

    const handleClick = (friendItem: FriendItem, index: number) => {
        // onClick(item);
        console.log("clicked", friendItem.username);
        // useFriendListStore.getState().setSelectedFriendIdList([item.id]);
        if (friendItem.username != null) {
            toggleSelectedFriendName(friendItem.username);
        }

        setClickedIndex(index);

    };

    useEffect(() => {
        if (hoveredIndex !== null && detailRef.current) {
            const detailRect = detailRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            if (detailRect.bottom > windowHeight) {
                detailRef.current.style.bottom = "0px";
            }

            if (detailRect.top < 0) {
                detailRef.current.style.top = "0px";
            }

            console.log("detailRect.left" + detailRect.left);

            new Promise<void>((resolve) => {
                if (detailRect.left < 0 || detailRect.right > windowWidth) {
                    detailRef.current!.style.left = "50%";
                    detailRef.current!.style.transform = "translateX(-90%)";
                }

                resolve();
            }).then(() => {
                console.log("detailRect.left2" + detailRect.left);
            });
        }
    }, [hoveredIndex]);



    return (
        <div className={styles.FriendListComponent} style={{width: width,height: height}}>

            {friendList.map((item, index) => (
                <div className={`${styles.FriendItem} ${ enableClickEffect && selectedFriendNameList.includes(item.username as string) ? styles.Clicked : ''}`}
                     key={index}
                     onMouseEnter={() => setHoveredIndex(index)}
                     onMouseLeave={() => setHoveredIndex(null)}
                     onClick={() => enableClickEffect && handleClick(item, index)}
                >
                        {/*<img className={styles.img} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>*/}
                        {/*<div>*/}
                        {/*    <img className={styles.img} src={item.icon}/>*/}
                        {/*</div>*/}
                        {/*<img className={styles.img} src={item.icon}/>*/}
                        <img className={styles.img} src={testAvatat}/>
                        <span className={styles.username} >{item.username}</span>

                        {hoveredIndex === index && !enableClickEffect && (
                            // <div className={styles.FriendItemDetail}>
                            // {/*<div>*/}
                            //     <p>Username: {item.username}</p>
                            //     {item.email && <p>Email: {item.email}</p>}
                            //     {item.age && <p>Age: {item.age}</p>}
                            //     {item.sex && <p>Sex: {item.sex}</p>}
                            //     {item.telephone && <p>Telephone: {item.telephone}</p>}
                            // </div>
                            <FriendListItemProfileComponent detailRef={detailRef} itemDetail={item}/>
                        )}

                </div>
            ))}

        </div>

    );
};

export default FriendListComponent;
