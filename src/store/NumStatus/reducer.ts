import handleNum from "./index"

const defaultState = {
    ...handleNum.state
}
let reducer = (state= defaultState,action:{type:string,val:number})=>{
    let newState=JSON.parse(JSON.stringify(state));

    // switch (action.type){
    //     case handleNum.add1:
    //         handleNum.actions[handleNum.add1 as keyof typeof handleNum.actions](newState,action)
    //         // handleNum.actions.add1(newState,action)
    //         break;
    //     case handleNum.add2:
    //         // handleNum.actions[handleNum.add2](newState,action)
    //         handleNum.actions[handleNum.add2 as keyof typeof handleNum.actions](newState,action)
    //         // handleNum.actions.add2(newState,action)
    //         break;
    //     default:
    //         break;
    // }

    for(let key in handleNum.actionNames){
        if(action.type===handleNum.actionNames[key as keyof typeof handleNum.actionNames] ){
            handleNum.actions[key as keyof typeof handleNum.actions](newState,action);
            break;
        }
    }

    return newState
}

export default reducer;