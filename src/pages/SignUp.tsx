import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { emailValidation } from '@/lib/Validation';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';

interface SignUpBody {
  email: string;
  password: string;
  pwConfirm: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<SignUpBody>({ mode: 'onChange' });

  const navigate = useNavigate();

  return (
    <Container>
      <SignUpFormContainer>
        <Title>
          <h2>회원가입</h2>
        </Title>
        <InfoContainer>
          <InfoWrapper>
            <span>가입 정보</span>
            <Label>
              Email
              <Input type="email" placeholder="kim@hospital.dr" {...register('email', emailValidation)} />
            </Label>
            <Label>
              Password
              <Input type="password" placeholder="8자 이상의 비밀번호를 입력해주세요." />
            </Label>
            <Label>
              Password Check
              <Input type="password" placeholder="비밀번호를 다시 입력해주세요." />
            </Label>
          </InfoWrapper>
          <InfoWrapper>
            <span>유저 정보</span>
            <Label>
              Name
              <Input type="text" placeholder="김의사" />
            </Label>
            <Label>
              Hospital
              <Input type="text" placeholder="연세 세브란스 병원" />
            </Label>
            <Label>
              Part
              <Input type="text" placeholder="응급의학과" />
            </Label>
            <Label>
              Phone Number
              <Input type="text" placeholder="010-1234-5678" />
            </Label>
          </InfoWrapper>
        </InfoContainer>
        <Btn content="회원가입" />

        <AlreadyAccount>
          <span>계정이 이미 있으신가요?</span>
          <span
            onClick={() => {
              navigate('/login');
            }}
            className="login"
          >
            로그인
          </span>
        </AlreadyAccount>
      </SignUpFormContainer>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-right: 1rem;
`;

const SignUpFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 900px;
  height: 900px;
  border-radius: 10px;
  background-color: ${props => props.theme.white};
`;

const Title = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  span {
    font-weight: 600;
    margin-bottom: 1.2rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin: 4rem 0 4rem;
`;

const Label = styled.label`
  width: 16rem;
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
`;

const Input = styled.input`
  width: 16rem;
  height: 2.5rem;
  padding-left: 1rem;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  font-family: 'Pretendard', sans-serif;
`;

const AlreadyAccount = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  .login {
    font-weight: 700;
    color: ${props => props.theme.primary};
  }
`;
