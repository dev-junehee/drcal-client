import { useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';
import { data } from '@/MockData/User';
import { UserData } from '@/lib/types';

// interface EditProfileBody
//   profile_image_url: string;
//   name: string;
//   hospital_id: number;
//   phone: string;
// }

const UserInfo = () => {
  const [user, setUser] = useState<UserData>(data.user);
  const [profileImg, setProfileImg]: string | null = useState('/public/user.png');
  const imgRef = useRef();
  console.log('확인', user);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors, isSubmitting, isDirty, isValid },
  //   reset,
  // } = useForm<SignUpBody>({ mode: 'onChange' });

  // 프로필 사진 업로드 핸들러
  const uploadProfileImg = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
  };

  return (
    <Container>
      <Title>
        <h2>개인정보 수정</h2>
      </Title>
      <FormWrapper id="user-info">
        <Label className="profile">
          <ProfileImgWrapper>
            <img src={profileImg ? profileImg : '/images/user.png'} alt="프로필 이미지" onClick={uploadProfileImg} />
          </ProfileImgWrapper>
          <ProfileImgEdit>변경</ProfileImgEdit>
          <Input type="file" accept="image/*" className="profile-img" />
        </Label>
        <Label>
          name
          <Input type="text" defaultValue={user.name} />
        </Label>
        <Label>
          Hospital
          <Select form="user-info" defaultValue="연세 세브란스">
            {user.hospital_id === 1 ? <option value="1">연세 세브란스 병원</option> : <></>}
          </Select>
        </Label>
        <Label>
          Part
          <Select form="user-info" defaultValue="응급의학과">
            {user.hospital_id === 1 ? <option value="1">응급의학과</option> : <></>}
          </Select>
        </Label>
        <Label>
          Phone Number
          <Input type="text" defaultValue={user.phone} />
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
  gap: 16px;
  width: 500px;
  height: 700px;
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

const Select = styled.select`
  width: 340px;
  height: 44px;
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 160px;
  height: 160px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ProfileImgEdit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 24px;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  font-family: 'Pretendard', sans-serif;
  font-size: 0.9rem;
  color: ${props => props.theme.white};
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const EditBtnWrapper = styled.div`
  margin-top: 20px;
`;
