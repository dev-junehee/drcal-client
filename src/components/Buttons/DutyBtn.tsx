import styled from 'styled-components';

const DutyBtn = () => {
  return <Container>당직 수정</Container>;
};

export default DutyBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
