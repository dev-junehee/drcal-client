import { styled } from 'styled-components';
import Btn from '@/components/Buttons/Btn';

export const RequestModal = ({ type }) => {
  return (
    <Container>
      <InputContainer>
        <div className="inputTitle">{type === 'duty' ? '기준 날짜' : '휴가 시작일'}</div>
        <input type="date" />
      </InputContainer>
      <InputContainer>
        <div className="inputTitle">{type === 'duty' ? '변경 날짜' : '휴가 종료일'}</div>
        <input type="date" />
      </InputContainer>
      {type === 'annual' && (
        <InputContainer>
          <div className="inputTitle">신청 사유</div>
          <textarea className="reasonBox" />
        </InputContainer>
      )}
      <Btn content={'신청하기'} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  button {
    margin-top: 24px;
  }
`;

const InputContainer = styled.div`
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
    resize: none;
    &:focus {
      outline: none;
      border: 1px solid ${props => props.theme.secondary};
      box-shadow: 0 0 6px 3px rgba(156, 184, 255, 0.3);
    }
  }
`;
