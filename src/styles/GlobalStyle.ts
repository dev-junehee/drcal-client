import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    position : relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    border: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', 'sans-serif';
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }
  body {
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.primary};
  }
  button {
    font-family: 'Pretendard', 'sans-serif';
  }
  input {
    box-sizing: border-box;
    width: 340px;
    height: 50px;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin-bottom: 2rem;
    transition: all 0.2s;
    &:focus {
      outline: none;
      border: 1px solid ${props => props.theme.secondary};
      box-shadow: 0 0 4px 2px rgba(156, 184, 255, 0.3);
    }
  }
`;

export default GlobalStyle;
