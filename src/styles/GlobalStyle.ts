import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root,
  body {
    position : relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', 'sans-serif';
  }
  
  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }

  body {
    background-color: ${props => props.theme.bgColor};
  }
  
  button {
    font-family: 'Pretendard', 'sans-serif';
  }
`;

export default GlobalStyle;
