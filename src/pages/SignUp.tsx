import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  emailValidation,
  PWValidation,
  nameValidation,
  phoneValidation,
  hospitalValidation,
  deptValidation,
} from '@/lib/Validation';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';
import { hospitalDecode } from '@/utils/decode';
import axios from 'axios';

interface SignUpBody {
  email: string;
  password: string;
  pwCheck: string;
  name: string;
  hospital: string;
  dept: string;
  phone: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpBody>({ mode: 'onChange' });

  const navigate = useNavigate();

  console.log(
    '병원명 출력 확인',
    Object.values(hospitalDecode).map(v => v.hospital),
  );

  console.log(
    '해당 병원의 파트 출력 확인',
    Object.values(hospitalDecode).map(v => v.dept),
  );

  // 회원가입 핸들러
  const userSignUp = ({ email, password, name, hospital, dept, phone }: SignUpBody) => {
    const body = {
      email,
      password,
      name,
      hospital,
      dept,
      phone,
    };
    axios.post('/user/register', body).then(res => {
      if (res.status === 200) {
        console.log('회원가입 성공', res);
        if (confirm('회원가입 성공!\n로그인 페이지로 이동하시겠습니까?')) {
          navigate('/login');
        }
      }
    });
    console.log('회원가입 정보 확인', body);
  };

  return (
    <Container>
      <SignUpFormContainer onSubmit={handleSubmit(userSignUp)}>
        <Title>
          <h2>회원가입</h2>
        </Title>
        <InfoContainer>
          <InfoWrapper>
            <span>가입 정보</span>

            <Label>
              Email
              {errors?.email && <Error>{errors.email.message}</Error>}
              <Input type="email" placeholder="kim@doctor.kr" {...register('email', emailValidation)} />
            </Label>
            <Label>
              Password
              {errors?.password && <Error>{errors.password.message}</Error>}
              <Input
                type="password"
                maxLength={20}
                placeholder="8자 이상의 비밀번호를 입력해 주세요."
                {...register('password', PWValidation)}
              />
            </Label>
            <Label>
              Password Check
              {errors?.pwCheck && <Error>{errors.pwCheck.message}</Error>}
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력해 주세요."
                {...register('pwCheck', {
                  required: '비밀번호 확인은 필수 입력입니다.',
                  validate: {
                    value: (pw: string | undefined) => {
                      if (watch('password') !== pw) return '비밀번호가 일치하지 않습니다.';
                    },
                  },
                })}
              />
            </Label>
          </InfoWrapper>
          <InfoWrapper>
            <span>유저 정보</span>
            <Label>
              name
              {errors?.name && <Error>{errors.name.message}</Error>}
              <Input type="text" placeholder="김의사" maxLength={10} {...register('name', nameValidation)} />
            </Label>
            <Label>
              Hospital
              {errors?.hospital && <Error>{errors.hospital.message}</Error>}
              <Select required {...register('hospital', hospitalValidation)}>
                <option value="" selected disabled hidden>
                  재직중인 병원을 선택해 주세요.
                </option>
                {Object.values(hospitalDecode).map(v => (
                  <option value={v.hospital}>{v.hospital}</option>
                ))}
              </Select>
            </Label>
            <Label>
              Part
              {errors?.dept && <Error>{errors.dept.message}</Error>}
              <Select required {...register('dept', deptValidation)}>
                <option className="default" value="" selected disabled hidden>
                  근무중인 파트를 선택해 주세요.
                </option>
                <option value="응급의학과">응급의학과</option>
                <option value="산부인과">산부인과</option>
              </Select>
            </Label>
            <Label>
              Phone Number
              {errors?.phone && <Error>{errors.phone.message}</Error>}
              <Input
                type="text"
                placeholder="하이픈(-) 없이 입력하세요."
                maxLength={11}
                {...register('phone', phoneValidation)}
              />
            </Label>
          </InfoWrapper>
        </InfoContainer>
        <Btn content="회원가입" disabled={isSubmitting} />

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
  padding-right: 16px;
`;

const SignUpFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 900px;
  height: 900px;
  border-radius: 10px;
  margin-right: 20px;
  background-color: ${props => props.theme.white};
`;

const Title = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 64px;
  margin: 30px 0 30px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 320px;
  gap: 16px;
  span {
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  width: 256px;
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

const Select = styled.select``;

const Error = styled.span`
  margin-left: 10px;
  font-size: 0.7rem;
  color: ${props => props.theme.red};
`;

const AlreadyAccount = styled.div`
  display: flex;
  gap: 8px;
  font-size: 0.9rem;
  .login {
    font-weight: 700;
    color: ${props => props.theme.primary};
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;
