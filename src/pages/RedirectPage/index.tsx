import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useRouteMatch } from 'react-router-dom';

import Header from '../../components/Header';
import ShortenerService from '../../services/shortenerService';

import { RedirectContainer } from './styles';

interface ReturnAPI {
  url: Location;
}

interface PostParams {
  code: string;
}

const RedirectPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { params } = useRouteMatch<PostParams>();

  useEffect(() => {
    async function loadURLStats(): Promise<void> {
      try {
        const service = new ShortenerService();

        const { url }: ReturnAPI = await service.getLink(params.code);

        window.location = url;

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage('Falha ao buscar os dados, verefique se a URL existe');
      }
    }
    loadURLStats();
  }, [params.code]);

  return (
    <Container>
      {errorMessage ? (
        <>
          <Header>Seu novo encurtador de URL</Header>
          <RedirectContainer className="text-center">
            <FontAwesomeIcon
              size="3x"
              color="#f8d7da"
              icon="exclamation-triangle"
            />
            <p className="m-3">{errorMessage}</p>
            <Link to="/" className="btn btn-primary">
              Encurtar nova URL
            </Link>
          </RedirectContainer>
        </>
      ) : (
        <Header>Redirecionando</Header>
      )}
    </Container>
  );
};

export default RedirectPage;
