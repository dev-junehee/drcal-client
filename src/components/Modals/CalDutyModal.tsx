import { styled } from 'styled-components';

export const CalDutylModal = ({ date }) => {
  return (
    <Container>
      {date}
      <div>
        <div></div>
        <div>김땡땡</div>
      </div>
      <InputContainer>
        <div className="inputTitle">특이사항</div>
        <textarea className="reasonBox" />
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
