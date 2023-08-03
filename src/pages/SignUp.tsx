import { useEffect, useState } from 'react';
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
  const [hospitalList, setHospitalList] = useState<string[]>([]);
  const [hospitalInfo, setHospitalInfo] = useState([]);
  const [hospitalDeptList, setHospitalDeptList] = useState<string[]>([]);
  const [hospitalDeptInfo, setHospitalDeptInfo] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpBody>({ mode: 'onChange' });

  const navigate = useNavigate();

  const url = 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com';

  // 등록된 병원 리스트 확인 (Select Box)
  const getHospitalList = () => {
    axios.get(`${url}/hospital/list`).then(res => {
      if (res.status === 200) {
        console.log('병원 리스트 호출 성공', res.data.item);
        setHospitalInfo(res.data.item);
        const hospitalNames = res.data.item.map((v: { hospitalName: string }) => v.hospitalName);
        setHospitalList(hospitalNames);
      }
    });
  };

  // 선택한 병원의 과 확인 (Select Box)
  const getHospitalDeptList = async (hospitalName: string) => {
    console.log('선택한 병원명 : ', hospitalName);
    console.log('병원들 : ', hospitalList);
    const hospitalId: number = hospitalList.indexOf(hospitalName) + 1;
    console.log('병원ID : ', hospitalId);
    if (hospitalId) {
      await axios
        .get(`${url}/dept/${hospitalId}/list`)
        .then(res => {
          if (res.status === 200) {
            setHospitalDeptInfo(Object.values(res.data.item));
            console.log('과 정보', hospitalDeptInfo);
            const deptList = Object.values(
              res.data.item
                .map((v: { deptName: string }) => v.deptName)
                .sort((a: number, b: number) => (a < b ? -1 : 1)),
            );
            setHospitalDeptList(deptList);
          }
        })
        .catch(error => console.log(error));
    }
  };

  useEffect(() => {
    getHospitalList();
  }, []);

  // 회원가입 핸들러
  const userSignUp = async ({ email, password, name, hospital, dept, phone }: SignUpBody) => {
    const hospital_id = hospitalInfo.find(v => v.hospitalName === hospital).hospitalId;
    const dept_id = hospitalDeptInfo.find(v => v.deptName === dept).deptId;
    console.log(hospital_id, dept_id);
    const body = {
      email,
      password,
      name,
      hospital_id,
      dept_id,
      phone,
    };
    console.log(body);
    await axios
      .post(`${url}/user/register`, body)
      .then(res => {
        if (res.status === 200) {
          console.log('회원가입 body', body);
          console.log('회원가입 성공', res);
          if (confirm('회원가입 성공!\n로그인 페이지로 이동하시겠습니까?')) {
            navigate('/login');
          }
        }
      })
      .catch(error => console.log('회원가입 실패', error));
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
              <select
                required
                defaultValue="default"
                {...register('hospital', hospitalValidation)}
                onChange={e => getHospitalDeptList(e.target.value)}
              >
                <option value="default" disabled hidden>
                  재직 병원을 선택해 주세요.
                </option>
                {hospitalList.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Label>
            <Label>
              Part
              {errors?.dept && <Error>{errors.dept.message}</Error>}
              <select required defaultValue="default" {...register('dept', deptValidation)}>
                <option value="default" disabled hidden>
                  근무 파트를 선택해 주세요.
                </option>
                {hospitalDeptList ? (
                  hospitalDeptList.map((v, i) => (
                    <Option className="default" key={i} value={v}>
                      {v}
                    </Option>
                  ))
                ) : (
                  <></>
                )}
              </select>
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

const Option = styled.option`
  &.default {
    color: red;
  }
`;

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
