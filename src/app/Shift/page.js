'use client'
import React, { useContext, useCallback } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FormDisabledDemo from "../AddShift/page.js";
import { DataContext } from '../Context/PopupContext.js';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from 'nookies';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff } from '../redux/slices/staffSlice.js';

export default function shift() {
    const router = useRouter();
    const dispatch = useDispatch();
    const apiData = useSelector(state => state.staff.listStaff);
    const isLoading = useSelector(state => state.staff.isLoading);
    const isError = useSelector(state => state.staff.isError);

    const status = parseCookies()['loggedIn'];
    const [token, setToken] = useState(status !== undefined ? status : null);

    const { data, updateData } = useContext(DataContext);

    // const [data2, setData2] = useState([]);
    const [button, setButton] = useState('');
    const [title, setTitle] = useState('');
    const [index, setIndex] = useState(null);

    useEffect(() => {
        if (token === null) {
            router.push('/Login');
        }
        // console.log(token);
    }, [token]);

    useEffect(() => {
        // axios.get('https://api-pos-win.dev.cfox.vn/api/work_day/staff')
        //     .then(response => {
        //         const apiData = response.data.data.map((item, index) => ({
        //             code: item.staff.code,
        //             post_id: item.staff.pos_id,
        //             first_name: item.staff.first_name,
        //             staff_id: item.staff_id,
        //         }));
        //         setData2(apiData);
        //         console.log(data2);
        //         setStaffId(apiData.map((item) => item.staff_id));
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        dispatch(getStaff());
    }, []);

    // const Checkout = async (index) => {
    //     // setStaffId(apiData.map((item) => item.staff_id));
    //     const checkout = {
    //         staff_id: staffId[index],
    //         type: 'out',
    //     };
    //     // console.log(index);
    //     try {
    //         const response = await axios.post('https://api-pos-win.dev.cfox.vn/api/work_day/shift', checkout);
    //         console.log(response.data); // In ra dữ liệu trả về từ server sau khi checkout
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const Checkin = async (index) => {
    //     // setStaffId(apiData.map((item) => item.staff_id));
    //     const checkin = {
    //         staff_id: staffId[index],
    //         type: 'in',
    //     };
    //     // console.log(index);
    //     try {
    //         const response = await axios.post('https://api-pos-win.dev.cfox.vn/api/work_day/shift', checkin);
    //         console.log(response.data); // In ra dữ liệu trả về từ server sau khi checkin
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const App = () => {

        const In = (index) => {
            updateData(true);
            setButton('Check in');
            setTitle('Bạn có muốn thêm nhân viên vào ca?');
            // Checkin(index);
            setIndex(index);
        }
        const Out = (index) => {
            updateData(true);
            setButton('Check out');
            setTitle('Bạn có muốn cho nhân viên rời ca?');
            // Checkout(index);
            setIndex(index);
        }
        return (
            isError === true ? <> <div>Something wrong, please try again..</div> </>
                : isLoading === true ? <> <div>Loading...</div> </>
                    : <div className='shiftpage'>
                        <div className='staffal'>
                            <h2>Ca làm việc</h2>
                            <ul className='Stafflist'>
                                {apiData.map((item, index) => {
                                    return (
                                        <li key={`staffal-${index}`}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                        </svg> {item.staff.first_name} <svg onClick={() => Out(index)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                            </svg></li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className='staffav'>
                            <h2>Nhân viên</h2>
                            <div className='subStaffav'>
                                {apiData.map((item, index) => {
                                    return (
                                        <div className='av' key={`staffav-${index}`} onClick={() => In(index)}>
                                            <h3>{item.staff.first_name}</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                            </svg>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
        )
    };
    return (
        <div>
            <App />
            {data && <FormDisabledDemo button={button} title={title} index={index} />}
        </div>
    )

}