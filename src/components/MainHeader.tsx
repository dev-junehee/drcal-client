import axios from 'axios';
import { useState, useEffect } from 'react';
import { hospitalDecode } from '@/utils/decode';
import { MdOutlineLocalHospital } from 'react-icons/md';
import styled from 'styled-components';

const MainHeader = () => {
  const [hospitalName, setHospitalName] = useState('병원명');

  // 유저 개인 정보 (mypage) - 재직 병원 확인
  const getUserHospital = () => {
    axios
      .get('/junehee/mypage.json')
      .then(res => {
        if (res.status === 200) {
          console.log('재직중인 병원 코드 확인', res.data.item.hospital_id);
          const hospitalNum = res.data.item.hospital_id;
          setHospitalName(hospitalDecode[hospitalNum].hospital);
        }
      })
      .catch(error => console.error('재직 병원 코드 확인 실패', error));
  };

  useEffect(() => {
    getUserHospital();
  }, []);

  return (
    <Container>
      <HosPitalName>
        <MdOutlineLocalHospital />
        <span className="hospital-name">{hospitalName}</span>
      </HosPitalName>
    </Container>
  );
};

export default MainHeader;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 64px;
  color: ${props => props.theme.gray};
  font-weight: 500;
`;

const HosPitalName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 32px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
