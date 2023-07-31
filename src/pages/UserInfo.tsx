import { useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';
// import { data } from '@/MockData/User';
import { UserData } from '@/lib/types';
import { hospitalDecode } from '@/utils/decode';
import axios from 'axios';

// interface EditProfileBody
//   profile_image_url: string;
//   name: string;
//   hospital_id: number;
//   phone: string;
// }

const UserInfo = () => {
  const [user, setUser] = useState<UserData>();
  const [profileImg, setProfileImg]: string | null = useState('/user.png');
  const imgRef = useRef();

  // 개인정보 조회
  const getUserInfo = () => {
    axios
      .get('/junehee/mypage.json')
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.item);
          setUser(res.data.item);
        }
      })
      .catch(error => console.error(error));
  };

  // 개인정보 수정
  const editUserInfo = () => {
    const body = {
      phone: '01000000000',
    };
    axios.post('/junehee/editMypage.json', body).then(res => {
      if (res.status === 200) {
        console.log('개인정보 수정 성공!', res.success);
      }
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors, isSubmitting, isDirty, isValid },
  //   reset,
  // } = useForm<SignUpBody>({ mode: 'onChange' });

  // 프로필 사진 업로드 핸들러
  const uploadProfileImg = () => {
    const file = imgRef.current?.files[0];
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
          <Input type="text" defaultValue={user?.name} />
        </Label>
        <Label>
          Hospital
          <Select></Select>
        </Label>
        <Label>
          Part
          <Select form="user-info">
            {hospitalDecode[user?.hospital_id]?.dept.map(v => <option value={v}>{v}</option>)}
          </Select>
        </Label>
        <Label>
          Phone Number
          <Input type="text" defaultValue={user?.phone} />
        </Label>
        <EditBtnWrapper>
          <Btn content="수정하기" onSubmit={editUserInfo} />
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
  width: 320px;
  border: 1px solid red;
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
  padding-left: 16px;
  border: 1px solid ${props => props.theme.gray};
  border-radius: 8px;
  margin-top: 8px;
  font-family: 'Pretendard', sans-serif;
  /* 브라우저 기본 디자인 숨기기 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* 새로운 화살표 디자인 추가 */
  background: url(/arrow.png) calc(100% - 16px) center no-repeat;
  background-size: 14px;
  background-color: ${props => props.theme.white};
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 160px;
  height: 160px;
  border-radius: 50%;
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
