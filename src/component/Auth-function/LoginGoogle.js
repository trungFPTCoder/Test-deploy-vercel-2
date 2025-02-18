
// // export default LoginGoogle
// import React, { useState } from 'react'
// import { useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import LoadingComponent from '../LoadingComponent';
// import '../../assest/LoginGoogle.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAccount } from '../../service/MovieService';
// import { setAccount } from '../MovieStore';
// function LoginGoogle() {
//   const [data, setData] = useState('');//user data 
//   const account = useSelector(state => state.account);
//   const dispatch = useDispatch();
//   // fetch account data
//   useEffect(() => {
//     const loadAccounts = async () => {
//       const accountsData = await fetchAccount();
//       dispatch(setAccount(accountsData));
//     };
//     loadAccounts();
//   }, [dispatch]);
//   // test add
//   const generateRandomId = () => `ACC${Math.floor(Math.random() * 100000)}`;
//   const [formData, setFormData] = useState({
//     accountId: generateRandomId(),
//     password:'',
//     FullName:'',
//     UserImage:'',
//     FavoriteMovie: []
//   });
//   // 
//   const login = useGoogleLogin({
//     onSuccess: async (response) => {
//       try {
//         const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//           headers: {
//             Authorization: `Bearer ${response.access_token}`,
//           },
//         }
//         );
//         setData(res.data)
//         console.log(res);
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   });


//   if (data.picture === null) {
//     return <LoadingComponent></LoadingComponent>
//   }
//   return (
//     <div>
//       <button type='button' onClick={() => login()} className='btn btn-login google mt-3'>Đăng nhập với Google</button>
//     </div>
//   )
// }

// export default LoginGoogle
import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import '../../assest/LoginGoogle.css';
import { useDispatch, useSelector } from 'react-redux';
import { addAccountService, fetchAccount } from '../../service/MovieService';
import { addAccount, setAccount } from '../MovieStore';
import { useNavigate } from 'react-router-dom';
function LoginGoogle() {
  const [data, setData] = useState(null); // user data
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch account data
  useEffect(() => {
    const loadAccounts = async () => {
      const accountsData = await fetchAccount();
      dispatch(setAccount(accountsData));
    };
    loadAccounts();
  }, [dispatch]);

  // Google login
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        const userData = res.data;
        checkAndAddUser(userData);

        console.log(res);
      } catch (err) {
        console.log('Login Failed', err);
      }
    },
    onError: (error) => {
      console.log('Login Failed', error);
    },
  });
  const checkAndAddUser = (userData) => {
    const userExists = account.some(account => account.email === userData.email && account.password === userData.sub);
    if (userExists) {
      // login thành công
      // navigate('/'); // Use navigate instead of Navigate
      // navigate('/', { state: { name: userData.name, picture: userData.picture } });
      navigate('/');
      sessionStorage.setItem('user', userData.name);
      sessionStorage.setItem('picture', userData.picture);
      sessionStorage.setItem('email', userData.email);
    } else {
      // navigate('/');
      // login lần đầu
      // navigate('/', { state: { name: userData.name, picture: userData.picture } });
      navigate('/');
      sessionStorage.setItem('user', userData.name);
      sessionStorage.setItem('picture', userData.picture);
      sessionStorage.setItem('email', userData.email);
      addUser(userData);
    }
  };
  // Add user data
  const addUser = async (userData) => {
    const newUser = {
      accountId: generateRandomId(),
      email: userData.email,
      password: userData.sub, 
      FullName: userData.name,
      UserImage: userData.picture,
      FavoriteMovie: [],
    };
    try {
      const addedUser = await addAccountService(newUser); // Add user to the backend
      dispatch(addAccount(addedUser)); // Dispatch action to add user to the Redux store
      console.log('User added:', addedUser);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const generateRandomId = () => `ACC${Math.floor(Math.random() * 100000)}`;

  return (
    <div>
      <button className='btn btn-login google mt-3' type='button' onClick={() => login()}>Login with Google</button>
    </div>
  );
}

export default LoginGoogle;