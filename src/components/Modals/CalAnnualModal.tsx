import { styled } from 'styled-components';

export const CalAnnualModal = ({ date }) => {
  return (
    <Container>
      {date}
      <TableContainer>
        <tr>
          <td>No.</td>
          <td>이름</td>
          <td>파트</td>
          <td>직급</td>
          <td>연락처</td>
        </tr>
        <tr>
          <td>1</td>
          <td>나영석</td>
          <td>소아과</td>
          <td>인턴</td>
          <td>010-92982-1828</td>
        </tr>
      </TableContainer>
      {/* <InputContainer>
        <div className="inputTitle">신청 사유</div>
        <textarea className="reasonBox" />
      </InputContainer> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const TableContainer = styled.table`
  width: 100%;
`;
