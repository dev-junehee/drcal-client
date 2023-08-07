import { styled } from 'styled-components';

export const CalDutylModal = ({ date }) => {
  return (
    <Container>
      <DateWrap> {date}</DateWrap>
      <UserWrap>
        <UserImg />
        <UserInfo>
          <NameCard>
            <div className="name">김땡땡</div>
            <div className="part">신경외과 레지던트</div>
          </NameCard>
          <DataCard>
            <div className="dataTitle">사번</div>
            <div className="dataText">1234123</div>
          </DataCard>
          <DataCard>
            <div className="dataTitle">전화번호</div>
            <div className="dataText">010-9191-1919</div>
          </DataCard>
          <DataCard>
            <div className="dataTitle">이메일</div>
            <div className="dataText">eefef@edfef.com</div>
          </DataCard>
        </UserInfo>
      </UserWrap>
      <InputContainer>
        <div className="inputTitle">특이사항</div>
        <div className="reasonBox">1교대</div>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;
`;
const DateWrap = styled.div`
  color: ${props => props.theme.primary};
  font-weight: 700;
  margin-bottom: 32px;
`;
const UserWrap = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const UserImg = styled.div`
  width: 140px;
  height: 140px;
  background-image: url(/public/user.png);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const InputContainer = styled.div`
  margin-top: 32px;
  .inputTitle {
    color: ${props => props.theme.gray};
    margin-bottom: 8px;
    font-family: 'ABeeZee', sans-serif;
  }
  .reasonBox {
    box-sizing: border-box;
    height: 92px;
    width: 320px;
    border: 1px solid ${props => props.theme.gray};
    border-radius: 8px;
    padding: 16px;
    transition: all 0.3s;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameCard = styled.div`
  margin-bottom: 16px;
  .name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .part {
    color: ${props => props.theme.gray};
  }
`;

const DataCard = styled.div`
  display: flex;
  margin-bottom: 4px;
  .dataTitle {
    font-weight: 700;
    margin-right: 8px;
    width: 60px;
  }
  .dataText {
  }
`;
