import styled from 'styled-components';

const ModalBtn = ({ handler }) => {
  return <Container onClick={handler}>신청하기</Container>;
};

export default ModalBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24rem;
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
