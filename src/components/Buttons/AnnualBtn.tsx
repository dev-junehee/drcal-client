import styled from 'styled-components';

const AnnualBtn = () => {
  return <Container>휴가 신청</Container>;
};

export default AnnualBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 3.5em;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.white};
`;
