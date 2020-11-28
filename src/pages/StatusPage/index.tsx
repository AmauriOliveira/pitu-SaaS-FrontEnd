/* eslint-disable import/no-duplicates */
import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useRouteMatch } from 'react-router-dom';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Header from '../../components/Header';
import ShortenerService from '../../services/shortenerService';

import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

interface ReturnAPI {
  code: string;
  createdAt: string;
  hits: number;
  id: number;
  updatedAt: string;
  url: string;
}

interface ShortenedUrl extends ReturnAPI {
  relativeDate: string;
}
interface PostParams {
  code: string;
}

const StatusPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shortenedURL, setShortenedURL] = useState<ShortenedUrl | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { params } = useRouteMatch<PostParams>();

  useEffect(() => {
    async function loadURLStats(): Promise<void> {
      try {
        const service = new ShortenerService();

        const result: ReturnAPI = await service.getStats(params.code);

        const { code, createdAt, hits, id, updatedAt, url } = result;

        const parsedDate = parseISO(updatedAt);
        const currentDate = new Date();

        const relativeDate = formatRelative(parsedDate, currentDate, {
          locale: ptBR,
        });

        setShortenedURL({
          code,
          createdAt,
          hits,
          id,
          updatedAt,
          url,
          relativeDate,
        });
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
      <Header>Estatísticas</Header>
      {isLoading ? (
        <Spinner animation="border" className="mx-auto" />
      ) : (
        <>
          {errorMessage ? (
            <StatsContainer className="text-center">
              <FontAwesomeIcon
                size="3x"
                color="#f8d7da"
                icon="exclamation-triangle"
              />
              <p className="m-3">{errorMessage}</p>
              <Link to="/" className="btn btn-primary">
                Encurtar nova URL
              </Link>
            </StatsContainer>
          ) : (
            <StatsContainer className="text-center">
              <p>
                <b>
                  https://pitu.tk/
                  {shortenedURL?.code}
                </b>
              </p>
              <p>
                Redireciona para:
                <br />
                {shortenedURL?.url}
              </p>
              <StatsRow>
                <StatsBox>
                  <b>{shortenedURL?.hits}</b>
                  <StatsBoxTitle>Visitas</StatsBoxTitle>
                </StatsBox>
                <StatsBox>
                  <b>{shortenedURL?.relativeDate}</b>
                  <StatsBoxTitle>Última visita</StatsBoxTitle>
                </StatsBox>
              </StatsRow>
              <Link to="/" className="btn btn-primary">
                Encurtar nova URL
              </Link>
            </StatsContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default StatusPage;
