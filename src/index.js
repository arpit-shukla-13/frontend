import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './User Components/Distribution/UserProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<UserProvider>
        <App />
    </UserProvider>
</BrowserRouter>
 
);


