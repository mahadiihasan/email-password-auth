import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../compononets/Header/Header';

const Main = () => {
    return (
        <div className='mx-auto my-auto w-50 p-2 mt-5 border border-info border-3'>
            <div className='text-center mt-5'>
                <Header></Header>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;