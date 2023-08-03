import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';
// import { data } from '@/MockData/User';
import { UserData } from '@/lib/types';
import { hospitalDecode } from '@/utils/decode';
import axios from 'axios';
import { PWValidation } from '@/lib/Validation';

interface EditProfileBody {
  name: string;
  deptId: number;
  phone: string;
  profileImageUrl: string;
}

const UserInfo = () => {
  const [user, setUser] = useState<UserData>();
  const [profileImg, setProfileImg]: string | null = useState('/user.png');
  const [passwordChecked, setPasswordChecked]: boolean = useState(false);
  const imgRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<SignUpBody>({ mode: 'onChange' });

  const url = 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com';

  // 비밀번호 확인
  const checkPassword = (password: string) => {
    axios
      .post(
        `${url}/user/login`,
        {
          email: 'chacha@drcal.com',
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          console.log('비밀번호 확인 성공', res);
          setPasswordChecked(!passwordChecked);
        }
      })
      .catch(error => console.log('비밀번호 확인 실패', error));
  };

  // 개인정보 조회
  const getUserInfo = async () => {
    await axios
      .get(`${url}/user/myPage`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  // 개인정보 수정
  const editUserInfo = ({ name, deptId, phone, profileImageUrl }: EditProfileBody) => {
    const body = {
      name,
      deptId,
      phone,
      profileImageUrl,
    };
    axios.post(`${url}/editUser`, body).then(res => {
      if (res.status === 200) {
        console.log('개인정보 수정 성공!', res);
      }
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
    <>
      {!passwordChecked ? (
        <PWCheckContainer>
          <Title>
            <h2>비밀번호 확인</h2>
          </Title>
          <p>개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해 주세요.</p>
          <PWCheckFormWrapper onSubmit={handleSubmit(checkPassword)}>
            <PwCheckLabel>
              <div className="error">{errors?.password && <Error>{errors.password.message}</Error>}</div>
              <Input
                type="password"
                maxLength={20}
                placeholder="현재 비밀번호를 입력해 주세요."
                {...register('password', PWValidation)}
              />
            </PwCheckLabel>
            <Btn content="확인하기" />
          </PWCheckFormWrapper>
        </PWCheckContainer>
      ) : (
        <UserInfoContainer>
          <Title>
            <h2>개인정보 수정</h2>
          </Title>
          <FormWrapper id="user-info">
            <Label className="profile">
              <ProfileImgWrapper>
                <img
                  src={profileImg ? profileImg : '/images/user.png'}
                  alt="프로필 이미지"
                  onClick={uploadProfileImg}
                />
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
        </UserInfoContainer>
      )}
    </>
  );
};

export default UserInfo;

const PWCheckContainer = styled.div`
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

const PWCheckFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  /* height: 150px; */
`;

const PwCheckLabel = styled.label`
  /* display: flex; */
  /* flex-direction: column; */
  justify-content: center;
  /* align-items: flex-start; */
  width: 320px;
  /* gap: 10px; */
  /* border: 1px solid red; */
  margin-bottom: 20px;
  font-family: 'ABeeZee', sans-serif;
  font-size: 0.8rem;
  .error {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 20px;
    /* border: 1px solid red; */
    font-family: 'Pretendard', sans-serif;
  }
`;

const Error = styled.span`
  margin-left: 10px;
  font-size: 0.7rem;
  color: ${props => props.theme.red};
`;

const UserInfoContainer = styled.div`
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
