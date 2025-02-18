import './App.css';
import Test from './views/Test'
import Test2 from './views/Test2'
import Home from './views/Home'
// import React, {createContext, useState} from 'react';
import {BrowserRouter, Link, Navigate, Route, Router, Routes, useNavigate, useRoutes} from 'react-router-dom'


import React from "react";
import routes from "./router/routes";
import {Provider} from "react-redux";
import store from "./store/index"
import stores from "./store";
import {setNavigate} from "./utils/newRequest/navigation";

function App() {
    const outlet  = useRoutes(routes);

    const navigate = useNavigate();
    setNavigate(navigate);

    return(
        <Provider store={store}>
            <div>
                {outlet}
            </div>
        </Provider>
        // <div>
        //     {/*123*/}
        //     {/*<Link to={"/home"}>home</Link>*/}
        //     {/*<Link to={"/home/test"}>test</Link>*/}
        //     {/*<Link to={"/home/test2"}>test2</Link>*/}
        //     {outlet}
        // </div>

        // <BrowserRouter>
        //     <Link to={"/home"}>home</Link>
        //     <Link to={"/test"}>test</Link>
        //     <Routes>
        //         <Route path={"/"} element={<Navigate to={"/home"}/> }></Route>
        //         <Route path={"/home"} element={<Home/>}></Route>
        //         <Route path={"/test"} element={<Test/>}></Route>
        //     </Routes>
        // </BrowserRouter>

    );
}

export default App;
