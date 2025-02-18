import React, {lazy} from 'react';
// import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
// import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import store from "./store"
import axios from 'axios';

import './i18n'

const Home = lazy(()=>import('./views/Home'))
const root = ReactDOM.createRoot(document.getElementById("root")!)

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//     <Provider store={store}>
//         <React.StrictMode>
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>
//         </React.StrictMode>
//     </Provider>
// );

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
