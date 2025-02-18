import React, { useEffect, useState } from 'react'
import '../../assest/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import LoginGoogle from './LoginGoogle'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAccount } from '../../service/MovieService'
import { setAccount } from '../MovieStore'
import Swal from 'sweetalert2';
function Login() {
  const [icon, setIcon] = useState(faEyeSlash);
  const account = useSelector(state => state.account);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 25/01/2025
  useEffect(() => {
    const loadAccounts = async () => {
      const accountsData = await fetchAccount();
      dispatch(setAccount(accountsData));
    };
    loadAccounts();
  }, [dispatch]);
  const handleLogin = (e) => {
    e.preventDefault();
    const user = account.find(account => account.email === email && account.password === password);
    if (user) {
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
        title: "Đăng nhập thành công"
      });

      // navigate('/', { state: { name: user.FullName, picture: user.UserImage } });
      navigate('/');
      sessionStorage.setItem('user', user.FullName);
      sessionStorage.setItem('picture', user.UserImage);
      sessionStorage.setItem('email', user.email);
    } else {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Đăng nhập thất bại',
      //   text: 'Email hoặc mật khẩu không đúng',
      // });
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
        icon: 'error',
        title: 'Đăng nhập thất bại',
        text: 'Email hoặc mật khẩu không đúng',
      });
    }
  };
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
  }

  return (
    <div>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name="description" content='Đăng nhập' />
      </Helmet>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form action="" onSubmit={handleLogin}>
              <h3>Đăng nhập</h3>
              <div className="inputbox">
                <i><FontAwesomeIcon icon={faEnvelope} /></i>
                <input type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <i><FontAwesomeIcon icon={faKey} /></i>
                <FontAwesomeIcon style={{cursor:'pointer'}} icon={icon} onClick={showPassword} className='eye mx-3' />
                <input type="password" id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
                <label>Mật khẩu</label>
              </div>
              <div className="forget position-relative">
                <label></label>
                <Link to={'/forget'}>Quên mật khẩu?</Link>
              </div>
              <button className='glow-on-hover-login position-relative'>
                Đăng nhập
              </button>
              <LoginGoogle />
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

export default Login