import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Btn from '@/components/Buttons/Btn';
import styled from 'styled-components';
import { UserData } from '@/lib/types';
import { hospitalDecode } from '@/utils/decode';
import axios from 'axios';
import { PWValidation, nameValidation, phoneValidation, hospitalValidation, deptValidation } from '@/lib/Validation';
import userImg from '/user.png';

interface EditProfileBody {
  name: string;
  deptName: string;
  phone: string;
  image: string;
}

const UserInfo = () => {
  const [user, setUser] = useState<UserData>({});
  // const [profileImg, setProfileImg]: string = useState('');
  const [passwordChecked, setPasswordChecked]: boolean = useState(false);
  const [hospitalDeptInfo, setHospitalDeptInfo] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset,
  } = useForm<SignUpBody>({ mode: 'onChange' });

  const url = 'http://fastcampus-mini-project-env.eba-khrscmx7.ap-northeast-2.elasticbeanstalk.com';
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdW5laGVlQGRyY2FsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJElVdUMzLlAzYVJ0RUcwZ2QxNWdaUy5tam9BemdWYjdvbmdYTWdXN3c1WnVVZkVtTlA3QVBTIiwiYXV0aCI6IlVTRVIiLCJpZCI6MTEsImV4cCI6MTY5MTM5NTk1MywidXNlcm5hbWUiOiLquYDspIDtnawiLCJzdGF0dXMiOiJBUFBST1ZFRCJ9.bcjiqSf7OTpTAAEDDuCUDZwzAWVG8JC7GZpmH5HJeCrbnjl0mjIrNuEGl-CNRMg4s8bprmtFSDqy_4XkDH7lOQ';

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

  // 비밀번호 재확인
  const checkPassword = async (password: string) => {
    await axios
      .post(
        `${url}/user/login`,
        {
          email: user.email,
          password: password.password,
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

  // 병원의 과 확인 (Select Box)
  const getDeptId = async (deptName: string) => {
    await axios.get(`${url}/dept/${user.hospital_id}/list`).then(res => {
      if (res.data.item.deptName === deptName) {
        console.log(res.data.item);
        return res.data.item.deptId;
      }
    });
  };

  // 병원 확인 (Select Box)
  const getHospitalName = async (hospitalId: number) => {
    await axios.get(`${url}/hospital/list`).then(res => {
      if (res.data.item.hospitalId === hospitalId) {
        console.log(res.data.item);
        return res.data.item.hospitalName;
      }
    });
  };

  // 개인정보 수정
  const editUserInfo = ({
    name = user.name,
    deptName,
    phone = user.phone,
    image = user.profile_image_url,
  }: EditProfileBody) => {
    const deptId = getDeptId(deptName);
    if (deptId !== undefined) {
      const body = {
        name,
        deptId,
        phone,
        image,
      };
      console.log('확인하자', body);
      console.log('이미지 업로드 확인', body.image[0].name);
      axios
        .post(`${url}/editUser`, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.status === 200) {
            console.log('개인정보 수정 성공!', res);
            location.reload();
          }
        })
        .catch(error => console.log('개인정보 수정 실패', error));
    }
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
          <FormWrapper id="user-info" onSubmit={handleSubmit(editUserInfo)}>
            <ProfileImgWrapper>
              <img src={userImg} alt="프로필 이미지" />
            </ProfileImgWrapper>
            <Label className="profile">
              <ProfileImgEdit>변경</ProfileImgEdit>
              <Input type="file" accept="image/*" className="profile-img" {...register('image')} />
            </Label>
            <Label>
              name
              <Input type="text" defaultValue={user?.name} {...register('name', nameValidation)} />
            </Label>
            <Label>
              Hospital
              <Select
                defaultValue={hospitalDecode[user?.hospital_id]?.hospital}
                {...register('hospital', hospitalValidation)}
              >
                <option value={hospitalDecode[user?.hospital_id]?.hospital}>
                  {hospitalDecode[user?.hospital_id]?.hospital}
                </option>
              </Select>
            </Label>
            <Label>
              Part
              <Select form="user-info" {...register('deptId', deptValidation)}>
                {hospitalDecode[user?.hospital_id]?.dept.map(v => <option value={v}>{v}</option>)}
              </Select>
            </Label>
            <Label>
              Phone Number
              <Input type="text" defaultValue={user?.phone} {...register('phone', phoneValidation)} />
            </Label>
            <EditBtnWrapper>
              <Btn content="수정하기" />
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
