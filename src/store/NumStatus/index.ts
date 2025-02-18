const store = {
    state:{
        num:20,
        // url:12
    },
    actions:{
        add1(newState:{num:number},action:{type:string}){
            // setTimeout(()=>{
            //     newState.num++;
            // },1000);
            newState.num++;
        },
        add2(newState:{num:number},action:{type:string,val:number}){
            setTimeout(()=>{
                newState.num=newState.num+action.val;
            },1000);
            // newState.num=newState.num+action.val;
        },
        // urlToPlay(newState:{url:string| undefined},action:{type:string,val:number}){
        //     setTimeout(()=>{
        //         newState.url=action.val;
        //     },1000);
        //     // newState.num=newState.num+action.val;
        // },
    },
    actionNames:{
        // add1:"add1",
        // add2:"add2",
    },

}
export default store;



// let actionNamesType :{ string, string };
// type data = { add1:"add1", };

let actionNames = {
    key:"str"
};

for (let key in store.actions){
    actionNames[key as keyof typeof actionNames] = key;
    console.log(key)
}

store.actionNames=actionNames;

