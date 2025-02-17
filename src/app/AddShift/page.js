'use client'
import React, { useState, useContext, useCallback, useEffect, memo } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
import { DataContext } from '../Context/PopupContext.js';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
// import axios from 'axios';
import { checkInStaff, checkOutStaff } from '../redux/staffReducer/action.js';
import { useDispatch } from 'react-redux';



// const { loading, error, login, token, logout } = useAuth();


const FormDisabledDemo = ({ button, title, index }) => {
    const dispatch = useDispatch();

    const { updateData } = useContext(DataContext);

    const divStyle = {
        display: 'block',
        width: '100%',
        textAlign: 'center',
        marginLeft: '100px',
    };
    const buttonStyle = {
        backgroundColor: 'red',
    }


    const cancle = () => {
        updateData(false);
    };
    const CheckIn = () => {
        console.log(button);
        dispatch(checkInStaff(index));
    };
    const CheckOut = () => {
        console.log(button);
        dispatch(checkOutStaff(index));
    };
    return (
        <div className='pop-up'>
            <button onClick={cancle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
            </button>
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 13,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 450,
                }}
                onFinish={button === 'Check in' ? CheckIn : CheckOut}
                autoComplete="off"
            >
                <h2>{title}</h2>
                <Form.Item style={divStyle}>
                    <Button type='primary' onClick={cancle} style={buttonStyle}>Hủy</Button>
                    <a>  </a>
                    <Button type='primary' htmlType="submit" >{button}</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default memo(FormDisabledDemo);