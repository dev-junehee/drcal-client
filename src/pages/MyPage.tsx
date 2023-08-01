import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <Container>
      <Title>
        <h2>비밀번호 확인</h2>
      </Title>
      <p>개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해 주세요.</p>
      <FormWrapper>
        <Label>
          <Input
            type="password"
            placeholder="현재 비밀번호를 입력해 주세요."
            maxLength={16}
            // {...register('password')}
          />
          {/* {errors?.password && <span>{errors.password.message}</span>} */}
        </Label>
        <div>
          <Btn content="확인하기" />
        </div>
      </FormWrapper>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 20px;
  p {
    font-size: 0.9rem;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-weight: 600;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 500px;
  /* height: 150px; */
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 320px; */
  gap: 10px;
  /* border: 1px solid red; */
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
`;

const Input = styled.input`
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
`;
