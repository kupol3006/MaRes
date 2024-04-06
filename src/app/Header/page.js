'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, LogoutOutlined, ApartmentOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { usePathname } from 'next/navigation';
import { useAuth } from '../Context/AuthContext.js';
import { parseCookies } from 'nookies';
import { useSelector } from 'react-redux';


const App = () => {
    const { logout } = useAuth();
    const [item, setItem] = useState(null);
    const pathname = usePathname();
    const [current, setCurrent] = useState('home');
    useEffect(() => {
        if (pathname === '/') {
            setCurrent('home');
        } else if (pathname === '/Login') {
            setCurrent('login');
        } else if (pathname === '/Shift') {
            setCurrent('Shift');
        }
    }, [pathname]);
    const stateLogin = parseCookies()['loggedIn'];
    const username = parseCookies()['username'];
    useEffect(() => {

        // console.log(stateLogin, username);
        setItem([
            {
                label: (
                    (stateLogin !== undefined ? <Link href="/" >Home</Link> : 'Home')
                ),
                key: 'home',
                icon: <HomeOutlined />,
            },
            {
                label: (
                    (stateLogin !== undefined ? <Link href="/Shift" >Ca làm việc</Link> : 'Ca làm việc')
                ),
                key: 'Shift',
                icon: <AppstoreOutlined />,
                // disabled: true,
            },
            {
                label: 'Sơ đồ bàn',
                key: 'SubMenu',
                icon: <ApartmentOutlined />,
                children: [
                    {
                        type: 'group',
                        label: 'Item 1',
                        children: [
                            {
                                label: 'Option 1',
                                key: 'setting:1',
                            },
                            {
                                label: 'Option 2',
                                key: 'setting:2',
                            },
                        ],
                    },
                    {
                        type: 'group',
                        label: 'Item 2',
                        children: [
                            {
                                label: 'Option 3',
                                key: 'setting:3',
                            },
                            {
                                label: 'Option 4',
                                key: 'setting:4',
                            },
                        ],
                    },
                ],
            },
            stateLogin ? {
                label: username,
                icon: <UserOutlined />,
                key: 'login',
                children: [
                    {
                        label: 'Đăng xuất',
                        icon: <LogoutOutlined />,
                        key: 'logout',
                        onClick: () => logout(),
                    },
                ],
            } : {
                label: (
                    <Link href="/Login" >
                        Đăng nhập
                    </Link>
                ),
                // icon: <SettingOutlined />,
                key: 'login',
            }
        ])
    }, [stateLogin]);
    const onClick = (e) => {
        if (stateLogin === undefined) {
            setCurrent('login');
        }
        else {
            console.log('click ', e);
            setCurrent(e.key);
        }
    };
    return <Menu theme='dark' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={item} />;
};

export default App;