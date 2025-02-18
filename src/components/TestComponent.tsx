import styles from "../scss/test.module.scss";
import {Button} from "antd";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {useEffect, useMemo, useRef, useState} from "react";


function TestComponent(){

    const aa:any|null=useRef();

    // let [fff,setFff] = useState<any|null>(null);

    const numb = useSelector<RootState, number>((state) => state.handleNum.num);

    useMemo(() => {
        aa.current=numb+1;
    }, [numb]);


    return(
        <div className={styles.test}>
            TestComponent
            {numb}
            <br/>
            {aa.current}
        </div>

    )
}

export default TestComponent;