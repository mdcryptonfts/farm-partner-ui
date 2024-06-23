import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import Loading from './pages/Loading';

ReactDOM.render(
    <ContextProvider>
        <Suspense fallback={<Loading />}>
        <App /> 
        </Suspense>
    </ContextProvider>,
    document.getElementById('root')
);
