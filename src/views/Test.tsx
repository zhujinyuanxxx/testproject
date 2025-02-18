import styles from '../scss/test.module.scss'
import { Button} from 'antd';
import { useSelector,useDispatch,Provider } from "react-redux";
import store from "../store/NumStatus";
import stores, {RootState} from "../store";
import TestComponent from "../components/TestComponent";

import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {mapDispatchToPropsFactory} from "react-redux/es/connect/mapDispatchToProps";



function Test(){

    let aa:any|null=useRef(0);

    function aaCount(){
        aa.current++;

        console.log(aa);
    }


    // let input:number;

    let [input,setInput] = useState<any | null>(null);

    function handle (e:React.FormEvent<HTMLInputElement>) {

        const newValue = e.currentTarget.value;

        input=ss;
        console.log(ss);

        setInput(input=newValue)
    }




    // type RootState = {
    //     num:number
    // };
    const numb = useSelector<RootState, number>((state) => state.handleNum.num);
    // let userData = useSelector((state: RootState) => {
    //     return state.handleNum.data;
    // });


    const dispatch = useDispatch();

    function changeNum(){
        // dispatch({type:"add2",val:3})
        dispatch({type:"add1"})
        console.log("numb:"+numb);
        aa.current=numb;
        console.log("numb:"+numb)
        console.log("aa.current:"+aa.current)
    }

    useEffect(()=>{
        //paramsData是某一个 paramsData变化就会被监听到，然后取值就算最新的paramsData
        console.log("useEffect+numb:"+numb)
    },[numb])

    let actionNames = {
        key:"str"
    };


    function tt():void{
        // for (let key in store.actions){
        //     actionNames[key as keyof typeof actionNames] = key;
        //     // result[key as keyof typeof result] = key;
        //
        //     console.log(actionNames[key as keyof typeof actionNames]);
        //     console.log("-----------")
        // }
        // console.log(a)
        localStorage.setItem('currentUser',"123");

        localStorage.removeItem('currentUser')

        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

        console.log(currentUser)
    }

    function printUrl():void{
        const urlParams = new URL(window.location.href);
        const pathname = urlParams?.pathname;
        console.log("pathname:", pathname);
    }



    function RepeatDiv() {
        const divs = [];
        for (let i = 0; i < 8; i++) {

            // let imageUrl = crawlerList[i].image;
            // divs.push(React.createElement('div', { key: i }, `This is div ${i + 1}:`.concat(`${crawlerList[i].image}`)));
            divs.push(

                <div className={styles.testBoxItems}>
                    <div className={styles.testBoxItem}>
                        edda 「フラワーステップ」- Flower Step - Music Video.
                    </div>
                    <div className={styles.testBoxItem}>
                        edda 「フラワーステップ」- Flower Step - Music Video.
                    </div>
                </div>



            )

        }
        return <div className={styles.testBox}>{divs}</div>;
    }

    return(
        // <div className={styles.test}>
        //     1111
        //     <Button type="primary" onClick={changeNum} className={styles.button}>numButton</Button>
        //     <Button type="primary" onClick={aaCount}>aaButton</Button>
        //     <Button type="primary" onClick={tt}>Button</Button>
        //     <Button type="primary" onClick={printUrl}>printUrl</Button>
        //     <p>{numb}</p>
        //     <p>{aa.current}</p>
        //     {/*<Provider store={stores}>*/}
        //         <TestComponent></TestComponent>
        //     {/*</Provider>*/}
        //     <Input size="large" placeholder="large size" prefix={<UserOutlined />} onChange={handle}/>
        //     {input}
        // </div>
        <div>


            <RepeatDiv/>
        </div>
    )
}

let ss:string;

const mapDispatchToProps = (dispatch:any)=>{
    return(
        ss
    )
}

// export default connect(null,mapDispatchToProps)(Test);
export default Test;