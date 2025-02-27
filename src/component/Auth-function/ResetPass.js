import React, { useEffect, useState } from 'react'
import '../../assest/ResetPass.css'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';

function ResetPass() {
    const [icon, setIcon] = useState(faEye);
    const [iconAgain, setIconAgain] = useState(faEye);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // nút gửi lại 
    const [countdown, setCountdown] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const showPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            setIcon(faEye);
        } else {
            x.type = "password";
            setIcon(faEyeSlash);
        }
    }
    const showPasswordAgain = () => {
        var x = document.getElementById("passwordAgain");
        if (x.type === "password") {
            x.type = "text";
            setIconAgain(faEye);
        } else {
            x.type = "password";
            setIconAgain(faEyeSlash);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // const Toast = Swal.mixin({
            //     toast: true,
            //     position: "top-end",
            //     showConfirmButton: false,
            //     timer: 3000,
            //     timerProgressBar: true,
            //     didOpen: (toast) => {
            //         toast.onmouseenter = Swal.stopTimer;
            //         toast.onmouseleave = Swal.resumeTimer;
            //         document.querySelector(".swal2-container").style.zIndex = "9999";  
            //         document.querySelector(".swal2-container").style.marginTop = "80px";
            //     }
            // });
            // Toast.fire({
            //     icon: "success",
            //     title: "Đăng nhập thành công"
            // });
            // } else {
            console.log('Passwords do not match');
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
        }
    };
    // nút gửi lại
    const handleResendClick = () => {
        setCountdown(30);
        setIsButtonDisabled(true);
    };

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0 && isButtonDisabled) {
            setIsButtonDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [countdown, isButtonDisabled]);
    return (
        <div>
            <Helmet>
                <title>Đặt lại mật khẩu</title>
                <meta name="description" content='Đặt lại mật khẩu' />
            </Helmet>
            <section>
                <div className="form-box">
                    <div className="form-value">
                        <form onSubmit={handleSubmit}>
                            <h3>Đặt lại mật khẩu</h3>
                            <p className="text-wrap">Hãy kiểm tra email của bạn, chúng tôi đã gửi cho bạn mã OTP để xác thực</p>
                            <div className="inputbox d-flex">
                                <input type="text" style={{paddingRight:'10px'}} required />
                                <label>Mã OTP</label>
                                {/* <button type="button" className="resend p-0">Gửi lại</button> */}
                                {isButtonDisabled ? (
                                    <button type="button" className="resend p-1 border-start border-end border-top rounded-top-3" disabled>
                                        Chờ {countdown}s
                                    </button>
                                ) : (
                                    <button type="button" className="resend p-1 border-start border-end border-top rounded-top-3" onClick={handleResendClick}>
                                        Gửi lại
                                    </button>
                                )}
                            </div>
                            <div className="inputbox">
                                <i onClick={showPassword}><FontAwesomeIcon icon={icon} /></i>
                                <input type="text" id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label>Mật khẩu mới</label>
                            </div>
                            <div className="inputbox">
                                <i onClick={showPasswordAgain}><FontAwesomeIcon icon={iconAgain} /></i>
                                <input type="text" id='passwordAgain' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                <label>Xác nhận mật khẩu mới</label>
                            </div>
                            <button type='submit' className='glow-on-hover position-relative'>
                                Xác nhận
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ResetPass
