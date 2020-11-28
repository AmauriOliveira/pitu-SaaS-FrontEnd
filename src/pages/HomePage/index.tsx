/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import React, { useState, FormEvent, useRef } from 'react';
import {
  Container,
  InputGroup,
  FormControl,
  Alert,
  Spinner,
} from 'react-bootstrap';

import Header from '../../components/Header';
import ShortenerService from '../../services/shortenerService';

import { ContentContainer, Form, Button } from './styles';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  function copyToClipBoard(): void {
    const element = inputRef;

    element.current?.select(); // seleciona o item
    document.execCommand('copy'); // copia para clipboard
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage('');

    if (!url) {
      setIsLoading(false);
      setErrorMessage('Informe uma url para encurtar.');
    } else {
      try {
        const service = new ShortenerService();

        const result = await service.generate({ url });

        setIsLoading(false);
        setCode(result.code);
      } catch (error) {
        setIsLoading(false);

        setErrorMessage('Falha ao encurtar a url, tente novamente');
      }
    }
  }

  return (
    <Container>
      <Header>Seu novo encurtador de URL</Header>
      <ContentContainer>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Digite a url para encurtar"
              defaultValue=""
              onChange={event => {
                setUrl(event.target.value);
              }}
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit">
                Encurtar
              </Button>
            </InputGroup.Append>
          </InputGroup>
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            code && (
              <>
                <InputGroup className="mb-3">
                  <FormControl
                    autoFocus
                    defaultValue={`https://pitu.tk/${code}`}
                    ref={inputRef}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={copyToClipBoard}
                    >
                      Copiar
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <p>
                  Para acompanhar as estatisticas acesse https://pitu.tk/
                  {code}
                </p>
              </>
            )
          )}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </Form>
      </ContentContainer>
    </Container>
  );
};

export default HomePage;
