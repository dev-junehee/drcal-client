import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PWValidation } from '@/lib/Validation';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';
import axios from 'axios';
import { UserData } from '@/lib/types';

interface EditPasswordBody {
  oldPassword: string;
  newPassword: string;
  pwCheck: string;
}

const UserInfo = () => {
  const [user, setUser] = useState<UserData>({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<EditPasswordBody>({ mode: 'onChange' });

  const url = 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com';
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdW5laGVlQGRyY2FsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFM1OE9maHU3Rk40WlZmYXRWZG1FMHV4VGd4Yi9VRW1hVjljLkx3YlFpMzZicVNGeDdRVWJ5IiwiYXV0aCI6IlVTRVIiLCJpZCI6MTEsImV4cCI6MTY5MTMwMzY4OCwidXNlcm5hbWUiOiLquYDspIDtnawiLCJzdGF0dXMiOiJBUFBST1ZFRCJ9._OLxe0Uu5Anjj8jE_0zOejha07qDFK01Gyl36FAMmQNDCVk7xgAiVXVyoE78pmOqKbfHRKTZtuhsQBoex_O3OQ';

  // 개인정보 조회
  const getUserInfo = async () => {
    await axios
      .get(`${url}/user/myPage`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.item);
          setUser(res.data.item);
        }
      })
      .catch(error => console.error('마이페이지 조회 실패', error));
  };

  // 비밀번호 수정 핸들러
  const editUserPassword = ({ oldPassword, newPassword }: EditPasswordBody) => {
    console.log('old PW: ', oldPassword);
    console.log('new PW: ', newPassword);
    const body = {
      new_password: newPassword,
      old_password: oldPassword,
    };
    axios
      .post(`${url}/user/updatePassword`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status === 200) {
          console.log('비밀번호 변경 성공!', res);
          alert('비밀번호 변경 성공!');
          location.reload();
        }
      })
      .catch(error => console.log('비밀번호 변경 실패', error));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
      <Title>
        <h2>비밀번호 수정</h2>
      </Title>
      <FormWrapper onSubmit={handleSubmit(editUserPassword)}>
        <Label>
          Password
          {errors?.oldPassword && <Error>{errors.oldPassword.message}</Error>}
          <Input
            type="password"
            maxLength={20}
            placeholder="현재 비밀번호를 입력해 주세요."
            {...register('oldPassword', PWValidation)}
          />
        </Label>
        <Label>
          New Password
          {errors?.newPassword && <Error>{errors.newPassword.message}</Error>}
          <Input
            type="password"
            maxLength={20}
            placeholder="8자 이상의 새 비밀번호를 입력해 주세요."
            {...register('newPassword', PWValidation)}
          />
        </Label>
        <Label>
          New Password Check
          {errors?.pwCheck && <Error>{errors.pwCheck.message}</Error>}
          <Input
            type="password"
            placeholder="새 비밀번호를 다시 입력해 주세요."
            {...register('pwCheck', {
              required: '비밀번호 확인은 필수 입력입니다.',
              validate: {
                value: (pw: string | undefined) => {
                  if (watch('newPassword') !== pw) return '비밀번호가 일치하지 않습니다.';
                },
              },
            })}
          />
        </Label>
        <EditBtnWrapper>
          <Btn content="수정하기" />
        </EditBtnWrapper>
      </FormWrapper>
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 20px;
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
  gap: 18px;
  width: 500px;
  height: 400px;
`;

const Label = styled.label`
  width: 320px;
  /* border: 1px solid red; */
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
  &.profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Input = styled.input`
  width: 320px;
  height: 40px;
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
  &.profile-img {
    display: none;
  }
`;

const Error = styled.span`
  margin-left: 10px;
  font-size: 0.7rem;
  color: ${props => props.theme.red};
`;

const EditBtnWrapper = styled.div`
  margin-top: 20px;
`;
