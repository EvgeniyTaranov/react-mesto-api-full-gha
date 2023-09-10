import { Link, useLocation } from 'react-router-dom';
import logoPath from '../images/mesto-white-logo.svg';
import React from 'react';

function Header({ email, onExit }) {
  const location = useLocation();

  const HeaderNavLink = {
    '/sign-in': {
      linkTo: '/sign-up',
      linkName: "Регистрация"
    },
    '/sign-up': {
      linkTo: '/sign-in',
      linkName: "Вход"
    },
    '/': {
      linkTo: '/sign-in',
      linkName: "Выход"
    },
  }

  const RenderHeaderNavLink = (location) => {
    if (location.pathname in HeaderNavLink) {
      return HeaderNavLink[location.pathname];
    } else {
      return {
        linkTo: '/',
        linkName: "Назад"
      }
    }
  }

  const handleCkick = () => {
    if (location.pathname === '/') {
      onExit();
    }
  }

  return (
    <header className="header">
      <img className="header__logo" alt="Белый логотип Mesto" src={logoPath} />
      <span className="header__navigation">{email}<Link className="header__link" onClick={handleCkick}
        to={RenderHeaderNavLink(location).linkTo}>{RenderHeaderNavLink(location).linkName}</Link></span>
    </header>
  )
}

export default Header
