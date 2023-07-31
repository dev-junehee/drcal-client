import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PWValidation } from '@/lib/Validation';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';

interface EditPasswordBody {
  password: string;
  ConfirmPW: string;
}

const UserInfo = () => {
  const [profileImg, setProfileImg]: string | null = useState('/public/user.png');
  const imgRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<EditPasswordBody>({ mode: 'onChange' });

  // 비밀번호 수정 핸들러
  const onSubmit = (data: EditPasswordBody) => {
    console.log('비밀번호 수정', data);
  };

  return (
    <Container>
      <Title>
        <h2>비밀번호 수정</h2>
      </Title>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Password
          <Input
            type="password"
            placeholder="현재 비밀번호를 입력해 주세요."
            maxLength={16}
            {...(register('password'), PWValidation)}
          />
          {errors?.password && <span>{errors.password.message}</span>}
        </Label>
        <Label>
          New Password
          <Input type="password" placeholder="8자 이상의 새 비밀번호를 입력해 주세요." />
        </Label>
        <Label>
          New Password Check
          <Input
            type="password"
            placeholder="새 비밀번호를 다시 입력해 주세요."
            maxLength={16}
            {...register('ConfirmPW', {
              required: '비밀번호는 필수 입력입니다.',
              validate: {
                value: (val: string | undefined) => {
                  if (watch('password') !== val) return '비밀번호가 일치하지 않습니다.';
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
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
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
  gap: 24px;
  width: 500px;
  height: 400px;
`;

const Label = styled.label`
  width: 340px;
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

const EditBtnWrapper = styled.div`
  margin-top: 20px;
`;
