import styled from 'styled-components';

const ExelBtn = () => {
  return <Container>엑셀 파일 다운로드</Container>;
};

export default ExelBtn;

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 30px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
