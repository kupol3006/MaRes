'use client'
// context.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState(false);
    const updateData = (newData) => {
        setData(newData);
    };



    return (
        <DataContext.Provider value={{ data, updateData }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
