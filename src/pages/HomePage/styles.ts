import styled from 'styled-components';
import { Button as BootstrapButton } from 'react-bootstrap';

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center !important;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  flex: 0 0 80%;
  max-width: 80%;
  padding: 2rem 2rem 1rem 2rem;
  border: solid 1px #ccc;
  border-radius: 0.25rem;
  text-align: center;
`;

export const Button = styled(BootstrapButton)`
  width: 5rem;
`;

export const AdsBlock = styled.div`
  border: solid 1px #f7f7f7;
  background: #f1f1f1;
  text-align: center;
  padding: 2rem;
  flex: 0 0 80%;
  max-width: 80%;
`;
