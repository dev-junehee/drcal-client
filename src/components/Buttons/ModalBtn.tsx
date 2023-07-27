import styled from 'styled-components';

const ModalBtn = ({ handler }) => {
  return <Container onClick={handler}>신청하기</Container>;
};

export default ModalBtn;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24rem;
  height: 3.5em;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
