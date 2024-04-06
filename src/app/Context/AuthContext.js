// contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();


    // const login = async (code, pin) => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.post('https://api-pos-win.dev.cfox.vn/api/auth/login', {
    //             code,
    //             pin,
    //         });
    //         const token = response.data.access_token; // Assuming the token is returned in the response data
    //         setToken(token);
    //         setCookie(null, 'loggedIn', token, {
    //             maxAge: 30 * 24 * 60 * 60, // Cookie sẽ tồn tại trong 30 ngày
    //             path: '/', // Đường dẫn của cookie
    //         });
    //         setCookie(null, 'username', code, {
    //             maxAge: 30 * 24 * 60 * 60, // Cookie sẽ tồn tại trong 30 ngày
    //             path: '/', // Đường dẫn của cookie
    //         });
    //         setLoading(false);

    //     } catch (error) {
    //         setError(error.response.data.message || 'An error occurred');
    //         setLoading(false);
    //     }
    // };

    const logout = () => {
        destroyCookie(undefined, 'loggedIn');
        destroyCookie(undefined, 'username');
        router.push('/Login');
    };


    return (
        <AuthContext.Provider value={{ logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);