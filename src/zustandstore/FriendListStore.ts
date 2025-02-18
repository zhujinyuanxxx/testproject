import create from 'zustand';
import {FriendItem} from "../components/FriendListComponent";

interface FriendListState {
    friendList: FriendItem[],
    setFriendList: (newFriendList:[]) => void,

    selectedFriendNameList: string[],
    setSelectedFriendNameList: (newSelectedFriendNameList:[]) => void,
    addSelectedFriendName: (newSelectedFriendName:string) => void,
    toggleSelectedFriendName:(newSelectedFriendName:string) => void,
}



const useFriendListStore = create<FriendListState>()((set) => ({
    friendList: [],
    setFriendList: (newFriendList:[]) => set( (state) => ({ friendList: newFriendList } )),
    selectedFriendNameList: [],
    setSelectedFriendNameList: (newSelectedFriendNameList:[]) => set( (state) => ({ selectedFriendNameList: newSelectedFriendNameList } )),
    addSelectedFriendName: (newSelectedFriendName:string) => set( (state) => ({ selectedFriendNameList: [...state.selectedFriendNameList, newSelectedFriendName] } )),

    toggleSelectedFriendName:(newSelectedFriendName:string) => set( (state) => ({
        selectedFriendNameList: (state.selectedFriendNameList.includes(newSelectedFriendName)) ? state.selectedFriendNameList.filter(friendName => friendName !== newSelectedFriendName) : [...state.selectedFriendNameList,newSelectedFriendName]
    }))
}));

export default useFriendListStore;
