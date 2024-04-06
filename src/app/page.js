// pages/index.js
'use client'
import React from 'react';
import Layout from './/layout'; // Import Layout component
import { useAuth } from './Context/AuthContext.js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies';
import { useSelector } from 'react-redux';

const Home = () => {
  const router = useRouter();
  const status = parseCookies()['loggedIn'];
  const [token, setToken] = useState(status !== undefined ? status : null);


  useEffect(() => {
    if (token === null) {
      router.push('/Login');
    }
  }, []);

  return (
    <div></div>
  );
};

export default Home;
