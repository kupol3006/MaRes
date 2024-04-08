'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useAuth } from '../Context/AuthContext';
import { parseCookies, setCookie } from 'nookies';
import { loginAsync } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const status = parseCookies()['loggedIn'];
    const [token, setToken] = useState(status !== undefined ? status : null);

    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {

        if (token !== null) {
            // Nếu đã đăng nhập thì chuyển hướng đến trang khác
            router.push('/');
        }
    }, []);

    const handleSubmit = () => {
        if (username === '65613728' && password === '000000') {
            dispatch(loginAsync({ code: username, pin: password }));
            router.push('/');
            // console.log(username, password);
        } else {
            alert('Sai tài khoản hoặc mật khẩu');
            // logout();
        }
    };


    return (
        <div>
            <div className='container'>
                <div className='login'>
                    <Form
                        // name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleSubmit}
                        // onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <h1>Login</h1>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input value={username} onChange={e => setUsername(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}