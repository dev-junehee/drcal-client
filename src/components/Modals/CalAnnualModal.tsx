import { styled } from 'styled-components';

export const CalAnnualModal = ({ date }) => {
  return (
    <Container>
      <DateWrap> {date}</DateWrap>
      <TableContainer>
        <DataWrap>
          <div>No.</div>
          <div>이름</div>
          <div>파트</div>
          <div>직급</div>
          <div>연락처</div>
        </DataWrap>
        <DataWrap>
          <div>1</div>
          <div>나영석</div>
          <div>소아과</div>
          <div>인턴</div>
          <div>010-92982-1828</div>
        </DataWrap>
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const DateWrap = styled.div`
  color: ${props => props.theme.primary};
  font-weight: 700;
  margin-bottom: 64px;
`;
const TableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 16px;
`;

const DataWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  &:first-child {
    font-weight: 900;
  }
  div {
    flex: 2;
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 3;
    }
  }
`;
