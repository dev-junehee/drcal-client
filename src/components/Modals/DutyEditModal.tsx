import { styled } from 'styled-components';

const DutyEditModal = () => {
  return (
    <Container>
      <Wrap>
        <h1>당직 변경 신청</h1>
        <input type="date" placeholder="변경 날짜를 선택해주세요" />
      </Wrap>
    </Container>
  );
};

export default DutyEditModal;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Wrap = styled.div``;
