// import React, { useState } from 'react'
// import '../../assest/SignIn.css'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons'
// import { faEye } from '@fortawesome/free-solid-svg-icons'
// import Swal from 'sweetalert2'
// import { Helmet } from 'react-helmet';
// function SignIn() {
//     const [icon, setIcon] = useState(faEye);
//     const [iconAgain, setIconAgain] = useState(faEye);
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const showPassword = () => {
//         var x = document.getElementById("password");
//         if (x.type === "password") {
//             x.type = "text";
//             setIcon(faEye);
//         } else {
//             x.type = "password";
//             setIcon(faEyeSlash);
//         }
//     }
//     const showPasswordAgain = () => {
//         var x = document.getElementById("passwordAgain");
//         if (x.type === "password") {
//             x.type = "text";
//             setIconAgain(faEye);
//         } else {
//             x.type = "password";
//             setIconAgain(faEyeSlash);
//         }
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (password !== confirmPassword) {
//             // const Toast = Swal.mixin({
//             //     toast: true,
//             //     position: "top-end",
//             //     showConfirmButton: false,
//             //     timer: 3000,
//             //     timerProgressBar: true,
//             //     didOpen: (toast) => {
//             //         toast.onmouseenter = Swal.stopTimer;
//             //         toast.onmouseleave = Swal.resumeTimer;
//             //         document.querySelector(".swal2-container").style.zIndex = "9999";  
//             //         document.querySelector(".swal2-container").style.marginTop = "80px";
//             //     }
//             // });
//             // Toast.fire({
//             //     icon: "success",
//             //     title: "Đăng nhập thành công"
//             // });
//             // } else {
//             const Toast = Swal.mixin({
//                 toast: true,
//                 position: "top-end",
//                 showConfirmButton: false,
//                 timer: 3000,
//                 timerProgressBar: true,
//                 didOpen: (toast) => {
//                     toast.onmouseenter = Swal.stopTimer;
//                     toast.onmouseleave = Swal.resumeTimer;
//                     document.querySelector(".swal2-container").style.zIndex = "9999";
//                     document.querySelector(".swal2-container").style.marginTop = "80px";
//                 }
//             });
//             Toast.fire({
//                 icon: "error",
//                 title: "Mật khẩu xác nhận không khớp"
//             });
//         }
//     };

//     return (
//         <div>
//             <Helmet>
//                 <title>Đăng ký</title>
//                 <meta name="description" content='Đăng ký' />
//             </Helmet>
//             <section style={{ paddingTop: '80px' }}>
//                 <div className="signIn-box" >
//                     <div className="signIn-value">
//                         <form action="" onSubmit={handleSubmit}>
//                             <h3>Đăng ký</h3>
//                             <div className="inputbox">
//                                 <i><FontAwesomeIcon icon={faUser} /></i>
//                                 <input type="text" required />
//                                 <label>Họ và tên</label>
//                             </div>
//                             <div className="inputbox">
//                                 <i><FontAwesomeIcon icon={faEnvelope} /></i>
//                                 <input type="text" required />
//                                 <label>Email</label>
//                             </div>
//                             <div className="inputbox">
//                                 <i onClick={showPassword}><FontAwesomeIcon icon={icon} /></i>
//                                 <input type="text" id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
//                                 <label>Mật khẩu</label>
//                             </div>
//                             <div className="inputbox">
//                                 <i onClick={showPasswordAgain}><FontAwesomeIcon icon={iconAgain} /></i>
//                                 <input type="text" id='passwordAgain' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//                                 <label>Xác nhận mật khẩu</label>
//                             </div>
//                             <div className="forget mb-4">
//                                 <label className="d-flex justify-content-center h6"><input type="checkbox" />Đồng ý với chính sách của chúng tôi</label>
//                             </div>
//                             <div className='text-danger'></div>
//                             <button className='glow-on-hover position-relative'>
//                                 Đăng ký
//                             </button>
//                             <div className="register login-now position-relative">
//                                 <p>Nếu bạn đã có tài khoản, <Link to={'/login'}>đăng nhập ngay</Link></p>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default SignIn

import React, { useEffect, useState } from 'react';
import '../../assest/SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { addAccount, setAccount } from '../MovieStore';
import { addAccountService, fetchAccount } from '../../service/MovieService';

function SignIn() {
    const [icon, setIcon] = useState(faEye);
    const [iconAgain, setIconAgain] = useState(faEye);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 25/01/2025
    const account = useSelector(state => state.account);
    // 
    const showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            setIcon(faEye);
        } else {
            x.type = "password";
            setIcon(faEyeSlash);
        }
    };

    const showPasswordAgain = () => {
        var x = document.getElementById("passwordAgain");
        if (x.type === "password") {
            x.type = "text";
            setIconAgain(faEye);
        } else {
            x.type = "password";
            setIconAgain(faEyeSlash);
        }
    };
    // lấy data fetch 25/02/2025
    useEffect(() => {
        const loadAccounts = async () => {
            const accountsData = await fetchAccount();
            dispatch(setAccount(accountsData));
        };
        loadAccounts();
    }, [dispatch]);
    //   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                    document.querySelector(".swal2-container").style.zIndex = "9999";
                    document.querySelector(".swal2-container").style.marginTop = "80px";
                }
            });
            Toast.fire({
                icon: "error",
                title: "Mật khẩu xác nhận không khớp"
            });
        } else {
            const newUser = {
                accountId: generateRandomId(),
                email,
                password,
                FullName: fullName,
                UserImage: 'images/defaultImage.png', // You can add a default image or handle this differently
                FavoriteMovie: [],
            };
            try {
                const userExists = account.some(account => account.email === newUser.email && account.password === newUser.password);
                if (userExists) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                            document.querySelector(".swal2-container").style.zIndex = "9999";
                            document.querySelector(".swal2-container").style.marginTop = "80px";
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Tài khoản đã tồn tại"
                    });
                } else {
                    const addedUser = await addAccountService(newUser); // Add user to the backend
                    dispatch(addAccount(addedUser)); // Dispatch action to add user to the Redux store
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                            document.querySelector(".swal2-container").style.zIndex = "9999";
                            document.querySelector(".swal2-container").style.marginTop = "80px";
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Đăng ký thành công"
                    });
                    navigate('/login');
                }
            } catch (error) {
                console.error('Failed to add user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Đăng ký thất bại',
                    text: 'Có lỗi xảy ra, vui lòng thử lại sau.',
                });
            }
        }
    };

    const generateRandomId = () => `ACC${Math.floor(Math.random() * 100000)}`;

    return (
        <div>
            <Helmet>
                <title>Đăng ký</title>
                <meta name="description" content='Đăng ký' />
            </Helmet>
            <section style={{ paddingTop: '80px' }}>
                <div className="signIn-box">
                    <div className="signIn-value">
                        <form onSubmit={handleSubmit}>
                            <h3>Đăng ký</h3>
                            <div className="inputbox">
                                <i><FontAwesomeIcon icon={faUser} /></i>
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                <label>Họ và tên</label>
                            </div>
                            <div className="inputbox">
                                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label>Email</label>
                            </div>
                            <div className="inputbox">
                                <i onClick={showPassword} style={{cursor:'pointer'}}><FontAwesomeIcon icon={icon} /></i>
                                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label>Mật khẩu</label>
                            </div>
                            <div className="inputbox">
                                <i onClick={showPasswordAgain} style={{cursor:'pointer'}}><FontAwesomeIcon icon={iconAgain} /></i>
                                <input type="password" id='passwordAgain' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                <label>Xác nhận mật khẩu</label>
                            </div>
                            <div className="forget mb-4">
                                <label className="d-flex justify-content-center h6"><input type="checkbox" />Đồng ý với chính sách của chúng tôi</label>
                            </div>
                            <button className='glow-on-hover position-relative'>
                                Đăng ký
                            </button>
                            <div className="register login-now position-relative">
                                <p>Nếu bạn đã có tài khoản, <Link to={'/login'}>đăng nhập ngay</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignIn;