import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';


import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';







  


  
  

ReactDOM.render(
    <ContextProvider>
        <Suspense fallback={<div>Loading...</div>}>
        <App /> 
        </Suspense>
    </ContextProvider>,
    document.getElementById('root')
);
