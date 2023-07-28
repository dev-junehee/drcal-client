import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <h1>어서오세요!</h1>
      <span>이메일</span>
      <input type="text" placeholder="이메일을 입력해주세요." />
      <span>비밀번호</span>
      <input type="password" placeholder="비밀번호를 입력해주세요." />
      <input type="submit" value="로그인" />
      <div>
        <span>아직 계정이 없으신가요?</span>
        <Link to="/signup">회원가입</Link>
      </div>
    </>
  );
};

export default Login;
