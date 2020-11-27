import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../components/Header';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Header />
      Hello
      <FontAwesomeIcon icon="check-square" />
    </Container>
  );
};

export default HomePage;
