import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import steelifyLogo from './steelifyLogo.png';
import './navbar.css';
import { getUserInfoFromToken } from '../../Utils/Auth/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Undefined');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const userName = getUserInfoFromToken(accessToken);
      setUserName(userName);
    }
  }, []);
console.log(userName)
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const items = isAuthenticated
    ? [
        { label: 'Get Quote', key: 'get-quote', path: '/get-quote' },
        { label: 'About Us', key: 'about-us', path: '/about-us' },
        {
          label: userName, // Dinamik olarak kullanıcı adını burada gösteriyoruz
          key: 'user',
          children: [
            { label: 'Profile', key: 'profile', path: '/profile' },
            { label: 'My Requests/Orders', key: 'my-orders', path: '/my-orders' },
            { label: 'Log Out', key: 'logout' },
          ],
        },
      ]
    : [
        { label: 'Login', key: 'login', path: '/login' },
        { label: 'Register', key: 'register', path: '/register' },
        { label: 'Get Quote', key: 'get-quote', path: '/get-quote' },
        { label: 'About Us', key: 'about-us', path: '/about-us' },
      ];

  const onClick = (e) => {
    if (e.key === 'logout') {
      localStorage.removeItem('accessToken');
      navigate('/login');
      return;
    }

    let item = items.find(item => item.key === e.key) || items.flatMap(i => i.children || []).find(sub => sub.key === e.key);

    if (item && item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="navbar-flex-container">
      <img src={steelifyLogo} alt="STEELIFY Logo" className="navbar-logo" onClick={() => navigate('/')} />
      <Menu onClick={onClick} mode="horizontal" items={items} selectedKeys={[]} className="navbar-menu" />
    </div>
  );
};

export default Navbar;