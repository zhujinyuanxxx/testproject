import {Navigate} from 'react-router-dom'
import React, {lazy, ReactElement} from "react";

const Home = lazy(()=>import('../views/Home'))
const Test = lazy(()=>import('../views/Test'))
const Test2 = lazy(()=>import('../views/Test2'))
const TableTest = lazy(()=>import('../views/TableTest'))
const Overview = lazy(()=>import('../views/Overview'))
const Profile = lazy(()=>import('../views/Profile'))
const Zhu = lazy(()=>import('../views/Zhu'))
const Bill = lazy(()=>import('../views/Bill'))
const Login = lazy(()=>import('../views/login/Login'))

const TT = lazy(()=>import('../views/login/tt'))
const DwonloadView = lazy(()=>import('../views/DwonloadView'))

const MessageNotification = lazy(()=>import('../views/MessageNotification'))

const App = lazy(()=>import('../App'))

export const withLoadingComponent = (comp:ReactElement | null) =>(
    <React.Suspense fallback={<div>Loading</div>}>
        {comp}
    </React.Suspense>
)

const Routes = [
    {
        path:"/",
        element:
            // <App/>
            <Navigate to={"/login"}/>,
        children: [

        ]
    },


    {
        path:"/login",
        element:
            <React.Suspense fallback={<div>Loading</div>}>
                <Login/>
            </React.Suspense>
    },
    {
        path:"/tt",
        element:
            <React.Suspense fallback={<div>Loading</div>}>
                <TT/>
            </React.Suspense>
    },
    // {
    //     path:"/MessageNotification",
    //     element:
    //         <React.Suspense fallback={<div>Loading</div>}>
    //             <MessageNotification/>
    //         </React.Suspense>
    // },
    {
        path:"/home",
        element:
            <React.Suspense fallback={<div>Loading</div>}>
                <Home/>
            </React.Suspense>,
            // <Navigate to={"/home/test"}/>,
            // withLoadingComponent(<Home/>),
        children:[
            {
                path: "/home/test",
                element:
                    <React.Suspense fallback={<div>Loading</div>}>
                        <Test/>
                    </React.Suspense>
            },
            {
                path:"/home/test2",
                element:
                    <React.Suspense fallback={<div>Loading</div>}>
                        <Test2/>
                    </React.Suspense>
            },
            {
                path:"/home/tableTest",
                element:
                    <React.Suspense fallback={<div>Loading</div>}>
                        <TableTest/>
                    </React.Suspense>
            },
            {
                path:"/home/User/Overview",
                element:
                    <React.Suspense fallback={<div>Loading</div>}>
                        <Overview/>
                    </React.Suspense>
            },
            {
                path:"/home/User/Profile",
                element:
                    <React.Suspense fallback={<div>Loading</div>}>
                        <Profile/>
                    </React.Suspense>
            },
            {
                path:"/home/User/Zhu",
                element:
                    <React.Suspense fallback={<div>Loading</div>}>
                        <Zhu/>
                    </React.Suspense>
            },
            {
                path:"/home/User/Bill",
                element:
                    <React.Suspense fallback={<div>Loading</div>}>
                        <Bill/>
                    </React.Suspense>
            },
            {
                path:"/home/User/Download",
                element:
                    <React.Suspense fallback={<div>Loading</div>}>
                        <DwonloadView/>
                    </React.Suspense>
            },
            {
                path:"/home/Message",
                element:
                    <React.Suspense fallback={<div>Loading</div>}>
                        <MessageNotification/>
                    </React.Suspense>
            },
        ]
    },



    // {
    //     path:"/test",
    //     element:
    //         <React.Suspense fallback={<div>Loading</div>}>
    //             <Test/>
    //         </React.Suspense>
    // }

]

export default Routes;