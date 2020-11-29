/* eslint-disable react/prop-types */
import React from 'react';

import icon from '../../assets/pitu.svg';

import { Logo, HeaderContainer } from './styles';

const Header: React.FC = ({ children }) => {
  return (
    <HeaderContainer>
      <Logo src={icon} alt="Logo do PITU" />
      <h1>Pitu</h1>
      <p>{children}</p>
    </HeaderContainer>
  );
};

export default Header;
