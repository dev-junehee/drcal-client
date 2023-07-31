import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Btn from '@/components/Buttons/Btn';
import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });

  const handleSubmitEvent = event => {
    event.preventDefault();
    console.log('서브밋!!');
    if (loginForm.password.length === 0) {
      setErrorMessage({ ...errorMessage, password: 'empty' });
      console.log('비번없음');
      console.log(errorMessage.password);
    }
    if (loginForm.password.length > 8 && loginForm.password.length <= 20) {
      setErrorMessage({ ...errorMessage, password: '' });
      console.log('비번잇음');
    }
    if (loginForm.password.length < 8 || loginForm.password.length >= 20) {
      setErrorMessage({ ...errorMessage, password: 'wrong' });
      console.log('비번이상');
      console.log(errorMessage.password);
    }
  };

  const showErrorMessage = () => {
    if (errorMessage.password === 'empty') {
      console.log('비번안나감');
      return (
        <InfoBox>
          <AiOutlineInfoCircle /> 비밀번호를 입력해주세요
        </InfoBox>
      );
    }
    if (errorMessage.password === 'wrong') {
      console.log('비번안나감');
      return (
        <InfoBox>
          {' '}
          <AiOutlineInfoCircle /> 올바른 비밀번호를 입력해주세요
        </InfoBox>
      );
    }
    return null;
  };

  return (
    <Container>
      <Wrap>
        <h1>어서오세요!</h1>
        <FormWrap onSubmit={event => handleSubmitEvent(event)} name="loginForm">
          <InputContainer>
            <div className="inputTitle">email</div>
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              value={loginForm.email}
              onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <div className="inputTitle">password</div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={loginForm.password}
              onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
            />
          </InputContainer>
          {showErrorMessage()}
          <InputContainer>
            <Btn content={'로그인'} />
          </InputContainer>
        </FormWrap>
        <div>
          <span>아직 계정이 없으신가요? </span>
          <Link to="/signup" className="linkto">
            회원가입
          </Link>
        </div>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 48px;
`;
const Wrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 700px;
  height: 1120px;
  border-radius: 8px;
  background-color: ${props => props.theme.white};
  h1 {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 32px;
  }
  .linkto {
    font-weight: 700;
    color: ${props => props.theme.primary};
  }
`;

const FormWrap = styled.form`
  margin-bottom: 32px;
`;

const InputContainer = styled.div`
  .inputTitle {
    margin-bottom: 10px;
  }
  button {
    margin-top: 32px;
  }
  &:nth-child(2) {
    input {
      margin-bottom: 16px;
    }
  }
`;

const InfoBox = styled.div`
  color: red;
  font-size: 14px;
`;

export default Login;
