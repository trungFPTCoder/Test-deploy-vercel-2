import React from 'react'
import '../../assest/Forget.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { Helmet } from 'react-helmet';
function Forget() {
    return (
        <div>
            <Helmet>
                <title>Quên mật khẩu</title>
                <meta name="description" content='Quên mật khẩu' />
            </Helmet>
            <section>
                <div className="form-box">
                    <div className="form-value">
                        <form action="">
                            <h3>Xác minh tài khoản</h3>
                            <h6>Vui lòng nhập tài khoản email để chúng tôi xác minh đó là bạn</h6>
                            <div className="inputbox">
                                <i><FontAwesomeIcon icon={faEnvelope}/></i>
                                <input type="text" required />
                                <label>Email</label>
                            </div>
                            <Link to={'/resetpass'}>
                                <button className='glow-on-hover position-relative'>
                                    Gửi mã OTP xác thực
                                </button>
                            </Link>
                            <div className="register position-relative">
                                <p>Nếu bạn chưa có tài khoản, <Link to={'/signin'}>đăng ký ngay</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Forget