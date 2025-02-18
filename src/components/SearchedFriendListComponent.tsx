import styles from "./scss/SearchedFriendListComponent.module.scss";
import {FriendItem} from "./FriendListComponent";
import ButtonComponent from "./ButtonComponent";
import testAvatar from "../logo.svg";
import useFriendListStore from "../zustandstore/FriendListStore";
import {useEffect, useRef, useState} from "react";



interface SearchedFriendListComponentProps {

    items?: FriendItem[];
    // onClick: (item: FriendItem) => void;
    width?: string;
    height?: string;
    onclick?: ()=>void;
}


const SearchedFriendListComponent: React.FC<SearchedFriendListComponentProps> = ({ items, height,width ,onclick}) => {

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

    useEffect(()=>{

        if (hoveredIndex !== null && detailRef.current) {
            const detailRect = detailRef.current?.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if(detailRect.bottom>windowHeight){
                // detailRef.current.style.bottom = `${detailRect.height}px`;
                detailRef.current.style.bottom = "0px";
            }

            if(detailRect.top<0){
                detailRef.current.style.top = "0px";
            }


        }

    },[hoveredIndex])



    return (
        <div className={styles.FriendListComponent} style={{width: width,height: height}}>

            {items?.map((item, index) => (
                <div className={styles.FriendItem}
                     key={index}

                >
                    <img className={styles.img} src={testAvatar}/>
                    <span className={styles.username} >{item.username}</span>
                    <ButtonComponent onclick={() => console.log(true)} name={"ADD"}/>
                </div>
            ))}

        </div>

    );
};

export default SearchedFriendListComponent;
