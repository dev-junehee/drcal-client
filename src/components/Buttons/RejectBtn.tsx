import styled from 'styled-components';

const RejectBtn = () => {
  return <Container>반려</Container>;
};

export default RejectBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 1.6rem;
  border: 0;
  outline: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.red};
  color: ${props => props.theme.white};
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    opacity: 0.9;
  }
`;
