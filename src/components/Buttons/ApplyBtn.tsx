import styled from 'styled-components';

const ApplyBtn = () => {
  return <Container>승인</Container>;
};

export default ApplyBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 1.6rem;
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
