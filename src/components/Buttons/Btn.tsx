import styled from 'styled-components';

const Btn = ({ content }) => {
  return <Container>{content}</Container>;
};

export default Btn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21rem;
  height: 3.5em;
  border: 0;
  outline: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    opacity: 0.9;
  }
`;
